import Button from '@/components/derived/Buttons/Buttons';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import OccupationForm from './OccupationForm';
import { initialValue, RequestData } from './occupationSchema';
import OccupationTable from './OccupationTable';

function Occupation() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<RequestData>(initialValue);
  const isEdit = !!formData.name;
  const permissionGate = usePermissionGate(SCREEN_CODE.OCCUPATION);
  const toggle = () => setIsOpen(!isOpen);
  const { t } = useTranslation();
  return (
    <>
      <Layout.Header>
        <HeaderTitle>{t('common:header.occupation')}</HeaderTitle>
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
          <OccupationForm
            toggle={toggle}
            isOpen={isOpen}
            formData={formData}
            isEdit={isEdit}
            setIsOpen={setIsOpen}
          />
          <Layout.Flex>
            <OccupationTable toggle={toggle} setFormData={setFormData} />
          </Layout.Flex>
        </Layout.Container>
      </div>
    </>
  );
}

export default Occupation;
