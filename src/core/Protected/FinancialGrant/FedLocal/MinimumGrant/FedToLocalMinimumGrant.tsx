import { Box, FlexBox } from '@/components/core';
import Button from '@/components/derived/Buttons/Buttons';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import Spinner from '@/components/Spinner/Spinner';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MinimumGrantForm from './MinimumGrantForm';
import { useFedToLocalMinimumGrantData, usePopulationRangeList } from './minimumGrantqueries';
import { MinGrantFormInitialValues, MinGrantInitialValueProps } from './minimumGrantschema';
import MinimumGrantView from './MinimumGrantView';

const FedToLocalMinimumGrant = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(MinGrantFormInitialValues);
  const { data: minimumGrantData, isLoading } = useFedToLocalMinimumGrantData();

  const { data: populationData } = usePopulationRangeList({ escape_pg: true });
  useEffect(() => {
    const arr: MinGrantInitialValueProps = { data: [] };
    populationData &&
      populationData.records.map((item) => {
        arr.data.push({
          population_range: item.id,
          number_of_localbody: '',
          minimum_grant_amount: ''
        });
      });
    setFormData(arr);
  }, [populationData]);

  console.log(minimumGrantData, 'qwe');

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Layout.Header>
            <HeaderTitle variant="h5" typeface="semiBold">
              Federal to Local Minimum Grant
            </HeaderTitle>

            <FlexBox align="center">
              {minimumGrantData && minimumGrantData.length > 0 && (
                <>
                  <Button
                    className="btn btn-primary btn-icon lft mr-2"
                    onClick={() => {
                      setIsEdit(true);
                      setFormData({
                        data: minimumGrantData?.map((item: any) => {
                          return {
                            population_range: item.population_range,
                            number_of_localbody: item.number_of_localbody,
                            minimum_grant_amount: item.minimum_grant_amount
                          };
                        })
                      });
                      setIsEdit(true);
                    }}>
                    <i className="ic-edit"></i>
                    {t('common:buttons.edit')}
                  </Button>
                </>
              )}

              <Button className="btn btn-outline-primary btn-icon lft" onClick={() => navigate(-1)}>
                <i className="ic-arrow-left"></i>
                {t('common:header.back_to_list')}
              </Button>
            </FlexBox>
          </Layout.Header>

          <Box className="flex-grow-1">
            {minimumGrantData && minimumGrantData.length > 0 && !isEdit ? (
              <MinimumGrantView minimumGrantData={minimumGrantData} />
            ) : (
              populationData && (
                <MinimumGrantForm
                  formData={formData}
                  populationData={populationData.records}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                />
              )
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default FedToLocalMinimumGrant;
