import React, { useState } from 'react';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import { Box, FlexBox, Text } from '@/components/core';
import { gray } from '@/theme/colors';
import Button from '@/components/derived/Buttons/Buttons';
import { financialGrantPath } from '@/routes/protected/financialGrant';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormulaGrantData } from './formulaBasedQueries';
import { formulaGrantInitialValue, formulaGrantInitialValueProp } from './formulaBasedSchema';
import FormulaGrantForm from './FormulaGrantForm';
import { sanitizeURL } from '@/shared/utils';

import Spinner from '@/components/Spinner/Spinner';
import EmptySection from '@/components/EmptySection';

import { masterConfigurationPath } from '@/routes/master-configuration';
import Empty from '@/assets/image/Frame.png';
import FormulaResultTable from './FormulaResultTable';

const FormulaBased = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<formulaGrantInitialValueProp>(formulaGrantInitialValue);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const { name } = useParams();

  const { data: formulaBasedGrant, isLoading: grantLoading } = useFormulaGrantData(name);

  return (
    <>
      {grantLoading ? (
        <Spinner />
      ) : (
        <>
          <Layout.Main>
            <Layout.Header>
              <HeaderTitle variant="h5" typeface="semiBold">
                Formula Grant Result
              </HeaderTitle>
              <Box>
                {formulaBasedGrant && formulaBasedGrant?.has_indicator && (
                  <Button
                    className="btn btn-outline-primary mr-2"
                    onClick={() => {
                      navigate(sanitizeURL(financialGrantPath.FormulaBasedIndicators));
                    }}>
                    View Details
                  </Button>
                )}
                {formulaBasedGrant && formulaBasedGrant.id && (
                  <Button
                    className="btn btn-primary btn-icon lft mr-2"
                    onClick={() => {
                      toggle();
                      setFormData({
                        percent: formulaBasedGrant?.percent,
                        id: formulaBasedGrant?.id,
                        fiscal_year: formulaBasedGrant?.fiscal_year.id,
                        total: formulaBasedGrant?.budget.amount,
                        budget: formulaBasedGrant?.budget.id
                      });
                    }}>
                    <i className="ic-edit"></i>
                    Edit
                  </Button>
                )}

                <Button
                  className="btn btn-outline-primary btn-icon lft"
                  onClick={() => navigate(-1)}>
                  <i className="ic-arrow-left"></i>
                  Back to list
                </Button>
              </Box>
            </Layout.Header>
            <div className="flex-grow-1 mt-3">
              <Layout.Container stretch>
                <Layout.Flex>
                  {formulaBasedGrant && formulaBasedGrant.percent ? (
                    <>
                      <FlexBox justify="space-between" align="center" className="w-100 mb-4">
                        <Box>
                          <Text variant="h3" typeface="semiBold" color={gray[600]}>
                            Rs.{formulaBasedGrant?.budget?.amount}
                          </Text>
                          <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                            Total Amount for {formulaBasedGrant?.fiscal_year?.name}
                          </Text>
                        </Box>
                        <FlexBox>
                          <Box className="pr-3 mr-3 border-right">
                            <Text variant="h3" typeface="semiBold" color={gray[600]}>
                              Rs.{formulaBasedGrant?.amount}
                            </Text>
                            <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                              Formula Grant Amount
                            </Text>
                          </Box>
                          <Box>
                            <Text variant="h3" typeface="semiBold" color={gray[600]}>
                              {parseInt(formulaBasedGrant?.percent)}%
                            </Text>
                            <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                              Formula Grant Percent
                            </Text>
                          </Box>
                        </FlexBox>
                      </FlexBox>
                      {formulaBasedGrant?.has_indicator ? (
                        <FormulaResultTable />
                      ) : (
                        <FlexBox align="center" justify="center" className="flex-grow-1 w-100">
                          <Box className="text-center">
                            <EmptySection
                              title={'Indicators Marks Not Set'}
                              description={'Click below to go to Indicator Marks Setup'}
                              button
                              btnText="Indicator Setup"
                              btnOnClick={() =>
                                navigate(sanitizeURL(masterConfigurationPath.indicatorSetup))
                              }
                            />
                          </Box>
                        </FlexBox>
                      )}
                    </>
                  ) : (
                    <>
                      <EmptySection
                        image={Empty}
                        title="Formula Grant Not added"
                        description="Add grant by clicking the button below"
                        button
                        btnText="Add Formula Grant"
                        btnOnClick={toggle}
                      />
                    </>
                  )}
                </Layout.Flex>
              </Layout.Container>
            </div>
            <FormulaGrantForm isOpen={isOpen} formData={formData} toggle={toggle} />
          </Layout.Main>
        </>
      )}
    </>
  );
};

export default FormulaBased;
