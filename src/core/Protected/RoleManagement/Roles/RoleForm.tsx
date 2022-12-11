import { Box } from '@/components/core';
import { Input, Label, Switch } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { Modal, ModalBody } from '@/components/utils';
import { useFormik } from 'formik';
import { useState } from 'react';
import { ModalFooter, ModalHeader } from 'reactstrap';
import { useRoleCreator } from './roleQueries';
import { roleFormProps, roleValidationSchema } from './schema';

interface RoleFormProps {
  formData: roleFormProps;
  isEdit: boolean;
  toggle: () => void;
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function RoleForm(props: RoleFormProps) {
  const { formData, isEdit, toggle, isOpen, setIsOpen } = props;

  const { mutate } = useRoleCreator(isEdit);
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
    validationSchema: roleValidationSchema,
    onSubmit: (values: roleFormProps, { resetForm }) => {
      mutate(values, {
        onSuccess: () => {
          if (!shouldAddNew && toggle) {
            toggle();
          } else {
            setIsOpen(true);
          }
          resetForm();
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
          <h6>{formType} Role</h6>
        </ModalHeader>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <ModalBody>
            <Box className="form-group">
              <Label htmlFor="">Name</Label>
              <Input value={values.name} onChange={handleChange} onBlur={handleBlur} name="name" />
              <FormikValidationError name="name" errors={errors} touched={touched} />
            </Box>
            <Box className="form-row">
              <Box className="col-lg-6">
                <Box className="form-group">
                  <Label htmlFor="code">Code</Label>
                  <Input
                    value={values.code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="code"
                  />
                  <FormikValidationError name="code" errors={errors} touched={touched} />
                </Box>
              </Box>
              <Box className="col-lg-6">
                <Box className="form-group">
                  <Label htmlFor="is_active">Is Active?</Label>
                  <Switch
                    onChange={(e) => {
                      setFieldValue('is_active', e.target.checked);
                      // console.log(e.target.checked,"e.target.checked")
                    }}
                    checked={values?.is_active}
                    name="is_active"
                  />
                </Box>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            {formType === 'Create' && (
              <Button
                className="btn btn-outline-gray-16"
                type="submit"
                onClick={() => setShouldAddNew(true)}>
                Create and add new
              </Button>
            )}
            <Button
              className="btn btn-success"
              type="submit"
              onClick={() => setShouldAddNew(false)}>
              {formType}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default RoleForm;
