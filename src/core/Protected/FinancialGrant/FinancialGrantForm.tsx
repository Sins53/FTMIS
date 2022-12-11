import { Box } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/utils';
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { useFiscalYearData } from '../MasterData/FiscalYear/fiscalYearQueries';
import { FiscalYearResponseData } from '../MasterData/FiscalYear/fiscalYearSchema';
import { useBudgetCreate } from './financialGrantQueries';
import { BudgetFormProps, BudgetInitialValues } from './financialGrantSchema';

function FinancialGrantForm({
  modal,
  toggle,
  grant,
  isEdit,
  setIsEdit,
  formData,
  setFormData
}: {
  modal: boolean;
  toggle: () => void;
  grant: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  formData: BudgetFormProps;
  setFormData: Dispatch<SetStateAction<BudgetFormProps>>;
}) {
  const [activeFiscalYear, setActiveFiscalYear] = useState<FiscalYearResponseData>();
  const { data: fiscalYearData } = useFiscalYearData({
    escape_pg: true
  });
  const {
    mutate: budgetMutate,
    isSuccess: budgetCreateSuccess,
    isLoading: budgetCreateLoading
  } = useBudgetCreate(isEdit);

  useEffect(() => {
    const activeYear = fiscalYearData?.records?.filter((data) => data.is_active);
    activeYear && setActiveFiscalYear(activeYear[0]);
  }, [fiscalYearData]);

  const { values, errors, handleChange, handleSubmit, touched, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    onSubmit: (values: BudgetFormProps) => {
      budgetMutate({ ...values, name: grant });
    }
  });

  useEffect(() => {
    if (budgetCreateSuccess) {
      toggle();
      resetForm();
      setFormData(BudgetInitialValues);
      setIsEdit(false);
    }
  }, [budgetCreateSuccess]);

  useEffect(() => {
    if (!modal) {
      setIsEdit(false);
      resetForm();
    }
  }, [toggle]);

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Setup Budget</ModalHeader>
      <form
        action=""
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <ModalBody>
          <Box className="mb-3">
            <Label>Fiscal Year</Label>

            <Input value={activeFiscalYear?.name} disabled />
            <FormikValidationError name="fiscal_year" errors={errors} touched={touched} />
          </Box>
          <Box className="mb-3">
            <Label>Total Amount</Label>
            <Input type="number" value={values.amount} name="amount" onChange={handleChange} />
            <FormikValidationError name="amount" errors={errors} touched={touched} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-outline-secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button className="btn btn-primary" type="submit">
            {budgetCreateLoading ? <Spinner size={'sm'} /> : 'Save'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default FinancialGrantForm;
