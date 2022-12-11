import HeaderImage from '@/assets/image/header.png';
import { useUserDetails } from '@/hooks/application';
import { coolGray } from '@/theme/colors';
import { Dispatch, SetStateAction } from 'react';
import { Modal } from 'reactstrap';
import { Box, FlexBox, Image, Text } from '../../core';
import Button from '../../derived/Buttons/Buttons';
import { ModalBody } from '../../utils';
import userImage from '@/assets/image/user.jpg';

// import ProfileImage from '@/components/ProfileImage/ProfileImage';

interface ProfileModalProps {
  toggle?: () => void;
  isOpen?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
function ProfileModal(props: ProfileModalProps) {
  const { toggle, isOpen, setIsOpen } = props;
  const userDetailData = useUserDetails();

  return (
    <>
      <Modal centered toggle={toggle} isOpen={isOpen} className="modal-profile">
        <div className="modal-header p-0">
          <Image src={HeaderImage}></Image>
          <Button className="btn" onClick={() => setIsOpen(!isOpen)}>
            <i className="ic-close text-white h6"></i>
          </Button>
        </div>
        <ModalBody className="p-0">
          <FlexBox align="center" justify="center" direction="column">
            <Box className="img-md">
              <Image src={userImage} width={'32'} height={'32'} className="rounded-circle" />
              {/* <ProfileImage image={profileData?.data.user.profile_pic} /> */}
            </Box>
            <Text typeface="bold" className="align-vertical mt-2">
              <span className="mr-1">{userDetailData?.first_name}</span>
              <span className="mr-1">{userDetailData?.middle_name}</span>
              {userDetailData?.last_name}
            </Text>
            <Box component="ul" className="list list-dots_sm mt-1">
              <Box component="li">
                <Text variant="display1" typeface="semiBold" color={coolGray[600]}>
                  {userDetailData?.username}
                </Text>
              </Box>
              <Box component="li">
                <Text variant="display1" typeface="semiBold" color={coolGray[600]}>
                  {userDetailData?.email}
                </Text>
              </Box>
            </Box>
          </FlexBox>
          <Box className="divider mt-4"></Box>
          <Box className=" bg-gray-96 p-4">
            <Text typeface="semiBold" variant="display1" color={coolGray[600]} className="mb-3">
              General Information
            </Text>
            <Box className="row">
              <Box className="col-lg-4">
                <Text typeface="regular" color={coolGray[600]} variant="h6" className="mb-1">
                  Email
                </Text>
                <Text typeface="semiBold" color={coolGray[700]}>
                  {userDetailData?.email}
                </Text>
              </Box>
            </Box>
          </Box>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ProfileModal;
