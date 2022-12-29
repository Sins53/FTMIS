import { FlexBox } from '@/components/core';
import Button from '@/components/derived/Buttons/Buttons';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ProvToLocalMinimumGrant = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Layout.Header>
        <HeaderTitle variant="h5" typeface="semiBold">
          Province to Local Minimum Grant
        </HeaderTitle>

        <FlexBox align="center">
          {/* {minimumGrantData && (
            <>
              <Button
                className="btn btn-primary btn-icon lft mr-2"
                onClick={() => {
                  toggle();
                  setFormData({
                    ...formData,
                    id: minimumGrantData.id,
                    fiscal_year: minimumGrantData.fiscal_year,
                    total: Number(budgetData?.gov_prov.budget?.amount) || 0,
                    budget: Number(budgetData?.gov_prov.budget?.id),
                    percent: Number(minimumGrantData.percent),
                    amount: Number(minimumGrantData.amount),
                    area_percent: Number(minimumGrantData.area_percent),
                    population_percent: Number(minimumGrantData.population_percent)
                  });
                }}>
                <i className="ic-edit"></i>
                {t('common:buttons.edit')}
              </Button>
            </>
          )} */}

          <Button className="btn btn-outline-primary btn-icon lft" onClick={() => navigate(-1)}>
            <i className="ic-arrow-left"></i>
            {t('common:header.back_to_list')}
          </Button>
        </FlexBox>
      </Layout.Header>
    </>
  );
};

export default ProvToLocalMinimumGrant;
