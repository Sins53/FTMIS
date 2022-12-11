import Button from '@/components/derived/Buttons/Buttons';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';

import React, { useState } from 'react';
import { RequestData, initialValue } from './selfEmploymentSchema';
import SelfEmploymentForm from './SelfEmploymentForm';
import SelfEmploymentTable from './SelfEmploymentTable';
import { useTranslation } from 'react-i18next';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';

function SelfEmployment() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<RequestData>(initialValue);
  const isEdit = !!formData.name;

  const permissionGate = usePermissionGate(SCREEN_CODE.SELF_EMPLOYMENT);
  const toggle = () => setIsOpen(!isOpen);
  const { t } = useTranslation();
  return (
    <>
      <Layout.Header>
        <HeaderTitle>{t('common:header.self_employment')}</HeaderTitle>
        {}
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
          <SelfEmploymentForm
            toggle={toggle}
            isOpen={isOpen}
            formData={formData}
            isEdit={isEdit}
            setIsOpen={setIsOpen}
          />
          <Layout.Flex>
            <SelfEmploymentTable toggle={toggle} setFormData={setFormData} />
          </Layout.Flex>
        </Layout.Container>
      </div>
    </>
  );
}

export default SelfEmployment;
