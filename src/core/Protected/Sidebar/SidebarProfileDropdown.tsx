import userImage from '@/assets/image/user.jpg';
import { Box, FlexBox, Image, Text } from '@/components/core';
import { useUserDetails } from '@/hooks/application';
import { coolGray, gray } from '@/theme/colors';
// import { generateFileUrl } from '@/utils';
import { AiFillCaretDown } from 'react-icons/ai';

export function SidebarIndividualDropdown() {
  const userDetailData = useUserDetails();

  return (
    <>
      <FlexBox align="center" className="w-100">
        <Image
          src={
            // userDetailData?.individual?.picture
            //   ? generateFileUrl(userDetailData?.individual?.picture)
            //   : userImage
            userImage
          }
          width={'32'}
          height={'32'}
          className="rounded-circle"
        />
        <Box className="text-start flex-grow-1 ml-3">
          <Text
            typeface="semiBold"
            variant="display1"
            color={coolGray[600]}
            className="align-vertical flex-wrap">
            <span className="mr-1"> {userDetailData?.first_name}</span>
            <span className="mr-1">{userDetailData?.middle_name}</span>
            {userDetailData?.last_name}
          </Text>
          {/* <Text variant="display2" color={coolGray[600]}>
              {userDetailData?.individual}
              </Text> */}
        </Box>
        <AiFillCaretDown color={gray[500]} />
      </FlexBox>
    </>
  );
}
