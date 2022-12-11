import { Box } from '@/components/core';
import Button from '@/components/derived/Buttons/Buttons';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FiscalYearForm from './FiscalYearForm';
import { fiscalYearInitialValues, FiscalYearResponseType } from './fiscalYearSchema';
import FiscalYearTable from './FiscalYearTable';

const FiscalYear = () => {
  const permissionGate = usePermissionGate(SCREEN_CODE.FISCAL_YEAR);
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FiscalYearResponseType>(fiscalYearInitialValues);
  const isEdit = !!formData.name;

  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <Layout.Header>
        <HeaderTitle>{t('common:header.fiscal_year')}</HeaderTitle>
        {permissionGate.can_create && (
          <Button
            className="btn btn-primary btn-icon lft"
            onClick={() => {
              setFormData(fiscalYearInitialValues);
              toggle();
            }}>
            <i className="ic-add"></i>
            {t('common:buttons.create')}
          </Button>
        )}
      </Layout.Header>
      <Box className="flex-grow-1 my-3">
        <Layout.Container stretch>
          <FiscalYearForm
            toggle={toggle}
            isOpen={isOpen}
            formData={formData}
            isEdit={isEdit}
            setIsOpen={setIsOpen}
          />
          <FiscalYearTable toggle={toggle} setFormData={setFormData} />
        </Layout.Container>
      </Box>
    </>
  );
};

export default FiscalYear;
