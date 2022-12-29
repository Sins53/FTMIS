import { Box } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/utils';
import { useFormik } from 'formik';
import React from 'react';
import { useParams } from 'react-router-dom';
import { usePerformanceGrantCreator } from './PerformanceBasedQueries';
import {
  PerformanceGrantFormProps,
  PerformanceGrantInitialValues,
  PerformanceValidationSchema
} from './performanceBasedSchema';

interface PerformanceFormProps {
  toggle: () => void;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  formData: PerformanceGrantFormProps;
  setFormData: React.Dispatch<React.SetStateAction<PerformanceGrantFormProps>>;
}

function PerformanceBasedForm(props: PerformanceFormProps) {
  const { id, name } = useParams();
  const { modal, toggle, formData, isEdit, setIsEdit } = props;
  const { mutate: performanceGrantMutate } = usePerformanceGrantCreator(
    name === 'gov_prov',
    formData.id ? true : false
  );

  const { values, errors, handleChange, handleSubmit, touched, handleBlur } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: PerformanceValidationSchema,
    onSubmit: (values: typeof PerformanceGrantInitialValues, { resetForm }) => {
      const reqData = {
        ...values,
        budget: Number(id)
      };

      performanceGrantMutate(reqData, {
        onSuccess: () => {
          resetForm();
          setIsEdit(false);
        }
      });
    }
  });
  return (
    <Modal isOpen={modal} size="sm">
      <ModalHeader toggle={toggle}>Performance Based Form</ModalHeader>
      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <ModalBody>
          <Box className="mb-4">
            <Label htmlFor="percent">Performance Based Grant</Label>
            <Input
              value={values.percent}
              onChange={handleChange}
              onBlur={handleBlur}
              name="percent"
              type={'number'}
              rightIcon={<i>%</i>}
            />
            <FormikValidationError name="percent" errors={errors} touched={touched} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-outline-primary" type="button" onClick={() => toggle()}>
            Cancel
          </Button>
          <Button className="btn btn-primary" type="submit" onClick={() => toggle()}>
            {isEdit ? 'Edit' : 'Save'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default PerformanceBasedForm;
