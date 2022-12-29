import { Box } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/utils';
import { useFormik } from 'formik';
import { t } from 'i18next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { useFiscalYearData } from '../MasterData/FiscalYear/fiscalYearQueries';
import { FiscalYearResponseData } from '../MasterData/FiscalYear/fiscalYearSchema';
import { useBudgetCreate } from './financialGrantQueries';
import { BudgetFormProps, BudgetValidationSchema } from './financialGrantSchema';

function FinancialGrantForm({
  modal,
  toggle,
  grant,
  isEdit,
  formData
}: {
  modal: boolean;
  toggle: () => void;
  grant: string;
  isEdit: boolean;
  formData: BudgetFormProps;
  setModal?: Dispatch<SetStateAction<boolean>>;
}) {
  const [activeFiscalYear, setActiveFiscalYear] = useState<FiscalYearResponseData>();
  const { data: fiscalYearData } = useFiscalYearData({
    escape_pg: true
  });
  const { mutate: budgetMutate, isLoading: budgetCreateLoading } = useBudgetCreate(isEdit);
  useEffect(() => {
    const activeYear = fiscalYearData?.records?.filter((data) => data.is_active);
    activeYear && setActiveFiscalYear(activeYear[0]);
  }, [fiscalYearData]);

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: BudgetValidationSchema,
    onSubmit: (value: BudgetFormProps) => {
      budgetMutate(
        { ...value, name: grant },
        {
          onSuccess: () => {
            toggle();
          }
        }
      );
    }
  });
  return (
    <Modal isOpen={modal} toggle={toggle} size="sm">
      <ModalHeader toggle={toggle}>Setup Budget</ModalHeader>
      <form
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
          <Button className="btn btn-outline-primary" type="button" onClick={toggle}>
            {t('common:buttons.cancel')}
          </Button>
          <Button className="btn btn-primary" type="submit">
            {budgetCreateLoading ? <Spinner size={'sm'} /> : t('common:buttons.save')}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default FinancialGrantForm;
