import React from 'react';
import { Box } from '@/components/core';
import Button from '@/components/derived/Buttons/Buttons';
import { AssignOfficeFormData, Province } from './schema';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/image/adbl-logo.png';
import { useAssignOfficesData } from './assignOfficeQueries';
import { getTextByLanguage } from '@/i18n/i18n';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';

interface OfficeListProps {
  toggle: () => void;
  setFormData: (formData: AssignOfficeFormData) => void;
  setIsHeadOffice: (isHeadOffice: boolean) => void;
  setProvinceId: (provinceId: number | undefined) => void;
}

const OfficeList = (props: OfficeListProps) => {
  const { setFormData, setIsHeadOffice, setProvinceId, toggle } = props;

  const { t } = useTranslation();
  const permissionGate = usePermissionGate(SCREEN_CODE.ASSIGN_OFFICE);

  const {
    data: departmentData
    // isLoading: departmentDataLoading,
    // isSuccess: departmentDataFetched
  } = useAssignOfficesData();

  console.log(departmentData, 'here');

  return (
    <>
      <div className="row w-100 mb-5">
        {departmentData?.data?.head_office && (
          <div className="col-lg-3 col-md-4">
            <Box className="border rounded p-3 d-flex flex-column align-items-center">
              <img className="pb-2" src={logo}></img>
              <h5 className="py-2">{getTextByLanguage('Head Office', 'प्रधान कार्यालय')}</h5>
              <p className="pb-2">
                {getTextByLanguage(
                  departmentData?.data?.head_office?.branch?.name_en,
                  departmentData?.data?.head_office?.branch?.name_np
                )}
              </p>
              {permissionGate.can_create && (
                <Button
                  className="btn btn-primary my-3"
                  onClick={() => {
                    setFormData({
                      branch_id: departmentData?.data?.head_office?.branch?.id || undefined
                    });
                    setIsHeadOffice(true);
                    toggle();
                    setProvinceId(undefined);
                  }}>
                  {departmentData?.data?.head_office?.branch?.id
                    ? t('common:actions.edit')
                    : t('common:actions.assign')}
                </Button>
              )}
            </Box>
          </div>
        )}
      </div>
      <div className="row w-100">
        {departmentData?.data?.provinces?.map((province: Province) => (
          <div className="col-lg-3 col-md-4 pb-4" key={province.id}>
            <Box className="border rounded p-3 d-flex flex-column align-items-center">
              <img className="pb-2" src={logo}></img>
              <h5 className="py-2">{getTextByLanguage(province?.name_en, province?.name_np)}</h5>
              <p className="pb-2">
                {getTextByLanguage(province?.branch?.name_en, province?.branch?.name_np) || '-'}
              </p>
              {permissionGate.can_update && (
                <Button
                  className="btn btn-primary my-3"
                  onClick={() => {
                    setFormData({ branch_id: province?.branch?.id || undefined });
                    setIsHeadOffice(false);
                    setProvinceId(province?.id);
                    toggle();
                  }}>
                  {province?.branch?.id ? t('common:actions.edit') : t('common:actions.assign')}
                </Button>
              )}
            </Box>
          </div>
        ))}
      </div>
    </>
  );
};

export default OfficeList;
