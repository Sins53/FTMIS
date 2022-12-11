import Button from '@/components/derived/Buttons/Buttons';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';

import React, { useState } from 'react';
import { departmentInitialValues, DepartmentRequestData } from './schema';
import { useTranslation } from 'react-i18next';
import DepartmentForm from './DepartmentForm';
import DepartmentTable from './DepartmentTable';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';
import { OptionType } from '@/components/StyledSelect/StyledSelect';

function Department() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<DepartmentRequestData>(departmentInitialValues);
  const [parentDepartmentOption, setParentDepartmentOption] = useState<OptionType[]>();
  const [parentTypetOption, setParentTypetOption] = useState<OptionType[]>();

  const isEdit = !!(formData.name_en || formData.name_np);

  const permissionGate = usePermissionGate(SCREEN_CODE.DEPARTMENT);

  const toggle = () => setIsOpen(!isOpen);
  const { t } = useTranslation();

  return (
    <>
      <Layout.Header>
        <HeaderTitle>{t('common:header.department')}</HeaderTitle>
        {permissionGate.can_create && (
          <Button
            className="btn btn-primary btn-icon lft"
            onClick={() => {
              setFormData(departmentInitialValues);
              toggle();
            }}>
            <i className="ic-add"></i>
            {t('common:buttons.create')}
          </Button>
        )}
      </Layout.Header>
      <div className="flex-grow-1 my-3">
        <Layout.Container stretch>
          <DepartmentForm
            toggle={toggle}
            isOpen={isOpen}
            formData={formData}
            isEdit={isEdit}
            setIsOpen={setIsOpen}
            parentDepartmentOption={parentDepartmentOption}
            setParentDepartmentOption={setParentDepartmentOption}
            parentTypetOption={parentTypetOption}
            setParentTypetOption={setParentTypetOption}
          />
          <Layout.Flex>
            <DepartmentTable
              toggle={toggle}
              isEdit={isEdit}
              setFormData={setFormData}
              setParentDepartmentOption={setParentDepartmentOption}
            />
          </Layout.Flex>
        </Layout.Container>
      </div>
    </>
  );
}

export default Department;
