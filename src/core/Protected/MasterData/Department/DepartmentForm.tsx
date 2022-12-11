import { Box } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement/index';
import StyledSelect, { OptionType } from '@/components/StyledSelect/StyledSelect';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { ModalHeader, Modal, ModalBody, ModalFooter } from '@/components/utils';
import { DepartmentRequestData, departmentValidationSchema } from './schema';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDepartmentCreator, useDepartmentData } from './departmentQueries';
import Button from '@/components/derived/Buttons/Buttons';
import { getLanguageLabelValueArray } from '@/utils/selectHelper';
import { useTranslation } from 'react-i18next';
import { PARENT_TYPE } from '@/shared/enums';

interface DepartmentFormProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: DepartmentRequestData;
  isEdit: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parentDepartmentOption: OptionType[] | undefined;
  setParentDepartmentOption: React.Dispatch<React.SetStateAction<OptionType[] | undefined>>;
  parentTypetOption: OptionType[] | undefined;
  setParentTypetOption: React.Dispatch<React.SetStateAction<OptionType[] | undefined>>;
}

function DepartmentForm(props: DepartmentFormProps) {
  const {
    toggle,
    isOpen,
    formData,
    isEdit,
    setIsOpen,
    parentDepartmentOption,
    setParentDepartmentOption,
    parentTypetOption,
    setParentTypetOption
  } = props;
  const { t } = useTranslation();

  const {
    data: departmentData,
    isLoading: departmentDataLoading,
    isFetched: departmentDataFetched
  } = useDepartmentData({ escape_pg: true });

  const { mutate: departmentMutate } = useDepartmentCreator(isEdit);

  useEffect(() => {
    if (departmentDataFetched && departmentData) {
      const department = getLanguageLabelValueArray(departmentData?.records ?? []);
      setParentDepartmentOption(department);
      // const parentType = getLanguageLabelValueArray(PARENT_TYPE);
      setParentTypetOption(PARENT_TYPE);
    }
  }, [departmentData, departmentDataFetched, !isEdit, t]);

  const [shouldAddNew, setShouldAddNew] = useState(false);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    setFieldValue,
    resetForm
  } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: departmentValidationSchema,
    onSubmit: (values: DepartmentRequestData, { resetForm }) => {
      const requestData: DepartmentRequestData = {
        ...values
      };
      departmentMutate(requestData, {
        onSuccess: () => {
          resetForm();
          setIsOpen(shouldAddNew);
        }
      });
    }
  });

  const formType = isEdit ? 'Edit' : 'Create';

  return (
    <>
      <Modal
        toggle={() => {
          toggle();
          resetForm();
        }}
        isOpen={isOpen}>
        <ModalHeader
          toggle={() => {
            toggle();
            resetForm();
          }}>
          <p>
            {formType === 'Create'
              ? t('common:header.department') + ' ' + t('common:buttons.create')
              : t('common:header.department') + ' ' + t('common:buttons.edit')}
          </p>
        </ModalHeader>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <ModalBody>
            <Box className="mb-2">
              <Label htmlFor="name_en">{t('fields:nameEn.label')}</Label>
              <Input
                value={values.name_en}
                onChange={handleChange}
                onBlur={handleBlur}
                name="name_en"
              />
              <FormikValidationError name="name_en" errors={errors} touched={touched} />
            </Box>
            <Box className="mb-2">
              <Label htmlFor="name_np">{t('fields:nameNp.label')}</Label>
              <Input
                value={values.name_np}
                onChange={handleChange}
                onBlur={handleBlur}
                name="name_np"
                isNepali
              />
              <FormikValidationError name="name_np" errors={errors} touched={touched} />
            </Box>
            <Box className="mb-2">
              <Label htmlFor="">{t('common:table.parent_department')}</Label>
              <StyledSelect
                options={parentDepartmentOption || []}
                name="parent_department"
                value={values.parent_department}
                onChange={({ main }) => {
                  setFieldValue('parent_department', main);
                }}
                calculateValueOnChange
                onBlur={handleBlur}
                isLoading={departmentDataLoading}
              />
              <FormikValidationError name="parent_department" errors={errors} touched={touched} />
            </Box>
            <Box className="mb-2">
              <Label htmlFor="">{t('common:table.parent_type')}</Label>
              <StyledSelect
                options={parentTypetOption || []}
                name="parent_type"
                value={values.parent_type}
                onChange={({ main }) => {
                  if (!main) {
                    setFieldValue('parent_type', null);
                  } else {
                    setFieldValue('parent_type', main);
                  }
                }}
                calculateValueOnChange
                onBlur={handleBlur}
                isLoading={departmentDataLoading}
              />
              <FormikValidationError name="parent_type" errors={errors} touched={touched} />
            </Box>
          </ModalBody>
          <ModalFooter>
            {formType === 'Create' && (
              <Button
                className="btn btn-outline-gray-16"
                type="submit"
                onClick={() => setShouldAddNew(true)}>
                {t('common:buttons.create_add')}
              </Button>
            )}
            <Button
              className="btn btn-success"
              type="submit"
              onClick={() => setShouldAddNew(false)}>
              {formType === 'Create' ? t('common:buttons.create') : t('common:buttons.edit')}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default DepartmentForm;
