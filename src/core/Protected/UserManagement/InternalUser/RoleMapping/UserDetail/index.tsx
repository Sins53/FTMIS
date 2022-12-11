import { Box, FlexBox, Image, Text } from '@/components/core';
import Avatar from '@/assets/image/user.jpg';
import { coolGray } from '@/theme/colors';
import { UserDetails } from '../UserScreen/schema';
import { base } from '@/theme/colors';
import { generateFileUrl } from '@/utils';
import { getTextByLanguage } from '@/i18n/i18n';

interface IProps {
  userData: UserDetails;
}

export default function UserDetail({ userData }: IProps) {
  return (
    <>
      <Box className="mt-4 mb-2">
        <Text className="mx-4 my-3" variant="h5" typeface="semiBold" color={base.primary}>
          User Details
        </Text>
        <FlexBox align="center" className="px-4 py-2">
          <Image
            width={'32'}
            height={'32'}
            className="rounded-circle"
            src={generateFileUrl(userData?.picture as string) || Avatar}
          />
          <Box className="ml-3">
            <Text variant="display1" typeface="semiBold" color={coolGray[800]}>
              {getTextByLanguage(
                `${userData?.first_name} ${userData?.middle_name} ${userData?.last_name}`,
                `${userData?.first_name} ${userData?.middle_name} ${userData?.last_name}`
              )}
            </Text>
            <Text variant="display2" color={coolGray[800]}>
              {getTextByLanguage(userData?.department_title_en, userData?.department_title_np)},{' '}
              {getTextByLanguage(userData?.designation_title_en, userData?.designation_title_np)}
            </Text>
          </Box>
        </FlexBox>
      </Box>
      <Box className="divider w-100"></Box>
      <Box className="px-4 py-3">
        <Text color={base.primary} typeface="semiBold">
          Basic Details
        </Text>
        <Box className="row mt-3">
          <Box className="col-6 mb-3 ">
            <Text variant="display1" color={coolGray[600]}>
              Employee Code
            </Text>
            <Text variant="p" color={coolGray[800]} typeface="semiBold">
              {userData?.employee_id}
            </Text>
          </Box>
          <Box className="col-6 mb-3 ">
            <Text variant="display1" color={coolGray[600]}>
              Branch
            </Text>
            <Text variant="p" color={coolGray[800]} typeface="semiBold">
              {getTextByLanguage(userData?.branch_name_en, userData?.branch_name_np)}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box className="divider w-100"></Box>
      <Box className="px-4 py-3">
        <Text color={base.primary} typeface="semiBold">
          Contact Details
        </Text>

        <Box className="row mt-3">
          <Box className="col-6 mb-3">
            <Text variant="display1" color={coolGray[600]}>
              Mobile Number
            </Text>
            <Text variant="p" color={coolGray[800]} typeface="semiBold">
              {userData?.mobile_number}
            </Text>
          </Box>
          <Box className="col-6 mb-3">
            <Text variant="display1" color={coolGray[600]}>
              Telephone
            </Text>
            <Text variant="p" color={coolGray[800]} typeface="semiBold">
              -
            </Text>
          </Box>
          <Box className="col-12">
            <Text variant="display1" color={coolGray[600]}>
              Email
            </Text>
            <Text variant="p" color={coolGray[800]} typeface="semiBold">
              {userData?.email}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}
