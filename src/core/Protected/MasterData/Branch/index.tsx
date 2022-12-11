import React, { useState } from 'react';
import Layout from '@/components/layout';
import Button from '@/components/derived/Buttons/Buttons';
import { HeaderTitle } from '@/components/Header/Header';
import { useTranslation } from 'react-i18next';
import BranchForm from './BranchForm';
import BranchTable from './BranchTable';
import { branchInitialValue, branchInitialValueProp } from './schema';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';
function Branch() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<branchInitialValueProp>(branchInitialValue);
  const isEdit = !!formData.name_en;
  const permissionGate = usePermissionGate(SCREEN_CODE.BRANCH_SETUP);
  const toggle = () => setIsOpen(!isOpen);
  const { t } = useTranslation();
  return (
    <>
      <Layout.Header>
        <HeaderTitle>{t('branch:branch')}</HeaderTitle>
        {permissionGate.can_create && (
          <Button
            className="btn btn-primary btn-icon lft"
            onClick={() => {
              setFormData(branchInitialValue);
              toggle();
            }}>
            <i className="ic-add"></i>
            {t('common:buttons.create')}
          </Button>
        )}
      </Layout.Header>
      <div className="flex-grow-1 my-3">
        <Layout.Container stretch>
          <BranchForm
            toggle={toggle}
            isOpen={isOpen}
            formData={formData}
            isEdit={isEdit}
            setIsOpen={setIsOpen}
          />
          <Layout.Flex>
            <BranchTable toggle={toggle} setFormData={setFormData} />
          </Layout.Flex>
        </Layout.Container>
      </div>
    </>
  );
}

export default Branch;
