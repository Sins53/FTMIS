import { Box, Button, FlexBox, Text } from '@/components/core';
import HeaderMain from '@/components/Header/HeaderMain';
import Layout from '@/components/layout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import ChangePassword from './ChangePassword/ChangePassword';
import { Card, GreyText, PrimaryText } from './sharedComponents/Shared';
// import UserInformationCard from './UserInformationCard';
import useAuth from '@/hooks/useAuth';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { gray } from '@/theme/colors';
// import ChangeNumber from './ChangeNumber/ChangeNumber';
import SuccessModal from '@/components/Modal/SuccessModal';
import { useUserDetails } from '@/hooks/application';

export default function UserSetting() {
  const { t } = useTranslation();

  const user = useUserDetails();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditNumberOpen, setIsEditNumberOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggleEditNumber = () => setIsEditNumberOpen(!isEditNumberOpen);
  const { logoutFromAllDeviceAction } = useAuth();

  // success modal
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const toggleSuccessModal = () => setModalSuccess(!modalSuccess);

  return (
    <>
      <HeaderMain title="Profile Settings"></HeaderMain>
      <div className="flex-grow-1 mt-3">
        <Layout.Container stretch>
          <Box className="row">
            <Box className="col-md-3">
              {/* <UserInformationCard /> */}
              yooo
            </Box>
            <Box className="col-md-9">
              <Button onClick={toggle} className="border-0 w-100  bg-transparent m-0 p-0 mb-2">
                <Card className="p-4 w-100 text-start">
                  <FlexBox align="center" justify="space-between">
                    <Box>
                      <PrimaryText typeface="semiBold" variant="h6" className="mb-1">
                        {t('common:changepassword')}
                      </PrimaryText>
                      <GreyText variant="display1">
                        {t('fields:changePasswordDescription.label')}
                      </GreyText>
                    </Box>
                    <MdKeyboardArrowRight size={16} color={gray[400]} />
                  </FlexBox>
                </Card>
              </Button>
              <Button
                onClick={toggleEditNumber}
                className="border-0 w-100  bg-transparent m-0 p-0 mb-4">
                <Card className="p-4 w-100 text-start">
                  <FlexBox align="center" justify="space-between">
                    <Box>
                      <PrimaryText typeface="semiBold" variant="h6" className="mb-1">
                        {t('common:header.change_number')}
                      </PrimaryText>
                      <GreyText variant="display1">
                        {t('common:header.click_change_number')}
                      </GreyText>
                      <GreyText typeface="semiBold" variant="display1">
                        {user?.mobile_number}
                      </GreyText>
                    </Box>
                    <MdKeyboardArrowRight size={16} color={gray[400]} />
                  </FlexBox>
                </Card>
              </Button>

              <Card>
                <Box className="px-4 py-3">
                  <FlexBox align="center" justify="space-between">
                    <Text variant="h6" typeface="bold">
                      {t('common:header.sessions')}
                    </Text>
                    <Button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        logoutFromAllDeviceAction();
                      }}>
                      {t('common:header.logout_all')}
                    </Button>
                  </FlexBox>
                </Box>
              </Card>
            </Box>
          </Box>
        </Layout.Container>
        {/* <ChangePassword isOpen={isOpen} toggle={toggle} setIsOpen={setIsOpen} />
        {isEditNumberOpen && (
          <ChangeNumber
            isOpen={isEditNumberOpen}
            toggle={toggleEditNumber}
            setIsOpen={setIsEditNumberOpen}
            toggleSuccessModal={toggleSuccessModal}
          />
        )} */}
        <SuccessModal
          modalSuccess={modalSuccess}
          toggleSuccessModal={toggleSuccessModal}
          title="Successful"
          message="Mobile number has been successfully changed."
          buttonText="OK"
        />
      </div>
    </>
  );
}
