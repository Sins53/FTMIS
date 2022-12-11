import { Box } from '@/components/core';
import { Label } from '@/components/core/FormElement';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/utils';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { AssignOfficeFormData, assignOfficeValidationSchema } from './schema';
import Button from '@/components/derived/Buttons/Buttons';
import StyledSelect, { OptionType } from '@/components/StyledSelect/StyledSelect';
import { useAssignHeadOffice, useAssignProvinceOffice } from './assignOfficeQueries';
import { useBranchesData } from '../Branch/branchQueries';
import { getLanguageLabelValueArray } from '@/utils/selectHelper';
import { useTranslation } from 'react-i18next';

interface AssignOfficeFormProps {
  toggle: () => void;
  isHeadOffice?: boolean;
  provinceId?: number;
  isEdit?: boolean;
  isOpen?: boolean;
  formData: AssignOfficeFormData;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AssignOfficeForm(props: AssignOfficeFormProps) {
  const { toggle, isOpen, formData, isHeadOffice, isEdit, provinceId } = props;

  const [branchOffices, setBranchOffices] = useState<OptionType[]>();
  const {
    data: branchData,
    isLoading: branchLoading,
    isSuccess: branchFetched,
    refetch: branchRefetch
  } = useBranchesData({ escape_pg: true, province: isHeadOffice ? undefined : provinceId });

  const { mutate: assignHeadOfficeMutate } = useAssignHeadOffice();
  const { mutate: assignProvinceOfficeMutate } = useAssignProvinceOffice();
  const { t } = useTranslation();

  useEffect(() => {
    if (branchFetched && [branchData]) {
      const branches = getLanguageLabelValueArray(branchData?.data?.records || []);
      setBranchOffices(branches);
    }
  }, [branchData, branchFetched, t]);

  useEffect(() => {
    branchRefetch();
  }, [provinceId]);

  const {
    values,
    errors,
    // handleChange,
    handleSubmit,
    touched,
    handleBlur,
    setFieldValue,
    resetForm
  } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: assignOfficeValidationSchema,
    onSubmit: (values: AssignOfficeFormData, { resetForm }) => {
      const requestData = { ...values };
      if (isHeadOffice) {
        assignHeadOfficeMutate(requestData);
      } else {
        assignProvinceOfficeMutate({ ...requestData, province_id: provinceId });
      }
      toggle();
      resetForm();
    }
  });

  const formType = isEdit ? 'Edit' : 'Assign';

  return (
    <>
      <Modal
        toggle={() => {
          toggle();
          resetForm();
        }}
        centered
        isOpen={isOpen}>
        <ModalHeader
          toggle={() => {
            toggle();
            resetForm();
          }}>
          <p>{isEdit ? t('common:modalTitle.edit_office') : t('common:header.asign_office')}</p>
        </ModalHeader>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <ModalBody>
            <Box className="mb-2">
              <Label htmlFor="">
                {isHeadOffice
                  ? t('fields:head_province_office.label')
                  : t('fields:province_office.label')}
              </Label>
              <StyledSelect
                options={branchOffices}
                name="branch_id"
                value={values?.branch_id}
                onChange={({ main }) => {
                  setFieldValue('branch_id', main);
                }}
                calculateValueOnChange
                onBlur={handleBlur}
                isLoading={branchLoading}
              />
              <FormikValidationError name="branch_id" errors={errors} touched={touched} />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-outline-gray-16" type="button" onClick={() => toggle()}>
              {t('common:buttons.cancel')}
            </Button>
            <Button className="btn btn-success" type="submit">
              {formType === 'Assign' ? t('common:actions.assign') : t('common:buttons.edit')}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default AssignOfficeForm;
