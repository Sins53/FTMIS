import Button from '@/components/derived/Buttons/Buttons';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';

import React, { useState } from 'react';
import { RequestData, initialValue } from './designationSchema';
import DesignationForm from './DesignationForm';
import DesignationTable from './DesignationTable';
import { useTranslation } from 'react-i18next';
import { SCREEN_CODE } from '@/routes/props';

function Designation() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<RequestData>(initialValue);
  const isEdit = !!formData.name_en;
  const permissionGate = usePermissionGate(SCREEN_CODE.DESIGNATION);

  console.log(permissionGate);
  const toggle = () => setIsOpen(!isOpen);
  const { t } = useTranslation();
  return (
    <>
      <Layout.Header>
        <HeaderTitle>{t('common:header.designation')}</HeaderTitle>
        {permissionGate.can_create && (
          <Button
            className="btn btn-primary btn-icon lft"
            onClick={() => {
              setFormData(initialValue);
              toggle();
            }}>
            <i className="ic-add"></i>
            {t('common:buttons.create')}
          </Button>
        )}
      </Layout.Header>
      <div className="flex-grow-1 my-3">
        <Layout.Container stretch>
          <DesignationForm
            toggle={toggle}
            isOpen={isOpen}
            formData={formData}
            isEdit={isEdit}
            setIsOpen={setIsOpen}
          />
          <Layout.Flex>
            <DesignationTable toggle={toggle} setFormData={setFormData} />
          </Layout.Flex>
        </Layout.Container>
      </div>
    </>
  );
}

export default Designation;
