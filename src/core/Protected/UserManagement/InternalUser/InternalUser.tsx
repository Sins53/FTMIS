import Button from '@/components/derived/Buttons/Buttons';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';
import { userManagementPath } from '@/routes/protected/userManagement';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import InternalUserTable from '../../UserList/InternalUserTable';

export default function InternalUser() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const permissionGate = usePermissionGate(SCREEN_CODE.USERS);

  return (
    <>
      <Layout.Header>
        <HeaderTitle>{t('fields:user.label')}</HeaderTitle>
        {permissionGate.can_create && (
          <Button
            className="btn btn-primary btn-icon lft"
            onClick={() => {
              navigate(userManagementPath.internalUserCreate);
            }}>
            <i className="ic-add"></i>
            {t('common:buttons.create')}
          </Button>
        )}
      </Layout.Header>
      <div className="flex-grow-1 my-3">
        <Layout.Container stretch>
          <Layout.Flex>
            <InternalUserTable />
          </Layout.Flex>
        </Layout.Container>
      </div>
    </>
  );
}
