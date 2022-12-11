import React, { useState } from 'react';
import Layout from '@/components/layout';
import { HeaderTitle } from '@/components/Header/Header';
import { useTranslation } from 'react-i18next';
import { AssignOfficeFormData, assignOfficeInitialValue } from './schema';
import AssignOfficeForm from './AssignOfficeForm';
import OfficeList from './OfficeList';
//import { usePermissionGate } from '@/hooks/useModulePermissionGate';

function AssignOffice() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<AssignOfficeFormData>(assignOfficeInitialValue);
  const isEdit = !!formData.branch_id;
  const [isHeadOffice, setIsHeadOffice] = useState<boolean>(false);
  const [provinceId, setProvinceId] = useState<number | undefined>();

  //const permissionGate = usePermissionGate(SCREEN_CODE.ASSIGN_OFFICE);
  const toggle = () => setIsOpen(!isOpen);
  const { t } = useTranslation();

  return (
    <>
      <Layout.Header>
        <HeaderTitle>{t('common:header.asign_office')}</HeaderTitle>
      </Layout.Header>
      <div className="position-relative flex-grow-1 my-3">
        <Layout.Absolute scrollable>
          <Layout.Container stretch>
            <OfficeList
              toggle={toggle}
              setFormData={setFormData}
              setIsHeadOffice={setIsHeadOffice}
              setProvinceId={setProvinceId}
            />
            <AssignOfficeForm
              toggle={toggle}
              isOpen={isOpen}
              formData={formData}
              isHeadOffice={isHeadOffice}
              provinceId={provinceId}
              isEdit={isEdit}
              setIsOpen={setIsOpen}
            />
          </Layout.Container>
        </Layout.Absolute>
      </div>
    </>
  );
}

export default AssignOffice;
