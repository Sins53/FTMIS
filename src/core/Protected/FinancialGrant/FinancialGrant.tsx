import Card from '@/components/Card/Card';
import { Box, FlexBox, Text } from '@/components/core';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from '@/components/utils';
import { financialGrantPath } from '@/routes/protected/financialGrant';
import { sanitizeURL } from '@/shared/utils';
import { blue, gray } from '@/theme/colors';
import { BUDGETENUM, getEnumKeyByEnumValue } from '@/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FinancialGrantForm from './FinancialGrantForm';
import { useBudgetData } from './financialGrantQueries';
import { BudgetFormProps, BudgetInitialValues } from './financialGrantSchema';

const FinancialGrant = () => {
  const [modal, setModal] = useState<boolean>(false);
  const toggle = () => setModal(!modal);

  const [grant, setGrant] = useState<string>('');

  const { data: budgetData } = useBudgetData({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<BudgetFormProps>(BudgetInitialValues);

  const navigate = useNavigate();

  return (
    <>
      <Layout.Header>
        <HeaderTitle variant="h5" typeface="semiBold">
          Equalization Grant
        </HeaderTitle>
      </Layout.Header>

      <Box className="flex-grow-1">
        <Layout.Container>
          <Box className="row mt-4">
            {budgetData &&
              Object.entries(budgetData)?.map((grant, index: number) => {
                return (
                  <Box className="col-lg-3 col-md-4 mb-4" key={index}>
                    <Card shadow="1" className="h-100">
                      <FlexBox direction="column" justify="space-between" className="h-100">
                        <FlexBox align="center" className="w-100" justify="space-between">
                          <Text variant="h5" typeface="semiBold" color={gray[800]}>
                            {getEnumKeyByEnumValue(BUDGETENUM, grant[0])}
                          </Text>

                          {grant[1]?.budget && (
                            <UncontrolledDropdown>
                              <DropdownToggle tag="a" role={'button'}>
                                <i className="ic-more-vert"></i>
                              </DropdownToggle>
                              <DropdownMenu right>
                                <DropdownItem
                                  onClick={() => {
                                    toggle();
                                    setIsEdit(true);
                                    setGrant(grant[0]);
                                    setFormData({
                                      id: Number(grant[1]?.budget?.id),
                                      name: grant[0],
                                      amount: Number(grant[1]?.budget?.amount)
                                    });
                                  }}>
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    navigate(
                                      sanitizeURL(financialGrantPath.MinimalGrantView, {
                                        name: grant[0],
                                        id: grant[1].budget.id
                                      })
                                    )
                                  }>
                                  Minimum Grant
                                </DropdownItem>
                                {grant[1]?.has_minimum_grant && (
                                  <>
                                    <DropdownItem
                                      onClick={() =>
                                        navigate(
                                          sanitizeURL(financialGrantPath.CommonPerformanceBased, {
                                            name: grant[0],
                                            id: grant[1].budget.id
                                          })
                                        )
                                      }>
                                      Performance Based
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() =>
                                        navigate(
                                          sanitizeURL(financialGrantPath.FormulaBased, {
                                            name: grant[0],
                                            id: grant[1].budget.id
                                          })
                                        )
                                      }>
                                      Formulae Based
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() =>
                                        navigate(
                                          sanitizeURL(financialGrantPath.FinalResultTable, {
                                            name: grant[0]
                                          })
                                        )
                                      }>
                                      Total Grant
                                    </DropdownItem>
                                  </>
                                )}
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          )}
                        </FlexBox>
                        <Box className="mt-5">
                          {grant[1]?.budget ? (
                            <>
                              <Text color={gray[48]} variant="h6">
                                Rs.{grant[1].budget.amount} for&nbsp;
                                {grant[1].budget.fiscal_year.name}
                              </Text>
                            </>
                          ) : (
                            <Text
                              variant="p"
                              color={blue[600]}
                              className="mt-2"
                              onClick={() => {
                                toggle();
                                setFormData(BudgetInitialValues);
                                setGrant(grant[0]);
                              }}>
                              <span role="button">
                                <i className="ic-settings mr-1 align-middle"></i>
                                Setup Budget
                              </span>
                            </Text>
                          )}
                        </Box>
                      </FlexBox>
                    </Card>
                  </Box>
                );
              })}
          </Box>
        </Layout.Container>
      </Box>

      <FinancialGrantForm
        modal={modal}
        toggle={toggle}
        grant={grant}
        isEdit={isEdit}
        formData={formData}
        setModal={setModal}
      />
    </>
  );
};

export default FinancialGrant;
