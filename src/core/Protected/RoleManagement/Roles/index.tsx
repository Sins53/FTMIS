import Button from '@/components/derived/Buttons/Buttons';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';
import { useState } from 'react';
import RoleForm from './RoleForm';
import RoleTable from './RoleTable';
import { roleFormProps, roleInitialValues } from './schema';

function Role() {
  const permissionGate = usePermissionGate(SCREEN_CODE.ROLES);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<roleFormProps>(roleInitialValues);

  const isEdit = !!(formData.name || formData.code);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Layout.Header>
        <HeaderTitle>Role Setup</HeaderTitle>
        {permissionGate.can_create && (
          <Button
            className="btn btn-primary btn-icon lft"
            onClick={() => {
              setFormData(roleInitialValues);
              toggle();
            }}>
            <i className="ic-add"></i>
            Create
          </Button>
        )}
      </Layout.Header>
      <div className="flex-grow-1 my-3">
        <Layout.Container stretch>
          <RoleForm
            isEdit={isEdit}
            formData={formData}
            toggle={toggle}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <Layout.Flex>
            <RoleTable setFormData={setFormData} toggle={toggle} />
          </Layout.Flex>
        </Layout.Container>
      </div>
    </>
  );
}

export default Role;
