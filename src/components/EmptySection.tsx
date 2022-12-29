import { coolGray } from '@/theme/colors';
import { IconType } from 'react-icons/lib';
import { Box, Image, Text } from './core';
import Button from './derived/Buttons/Buttons';
import Empty from '@/assets/image/Frame.png';
import LoadingButton from './LoadingButton/LoadingButton';
export interface EmptySectionProp {
  icon?: string | IconType | any;
  title?: string;
  description?: string;
  image?: string;
  button?: boolean;
  btnOnClick?: () => void;
  btnText?: string;
  btnLoading?: boolean;
  style?: any;
}

export default function EmptySection(props: EmptySectionProp) {
  const { icon, title, description, image, button, btnOnClick, btnText, btnLoading, style } = props;
  return (
    <div className="align-center text-center w-100 h-100 p-3" style={style}>
      <Box className="text-gray-32 ">
        {icon && (
          <Text variant="h1" color={coolGray[600]}>
            {icon}
          </Text>
        )}
        <Image src={image ? image : Empty} height="350px" />
        {title && (
          <Text variant="h5" typeface="semiBold" color={coolGray['600']} className="mt-5 mb-1">
            {title ? title : 'No Record Found'}
          </Text>
        )}
        {description && (
          <Text variant="p" className=" text-cool-gray-600">
            {description ? description : 'No Record Found'}
          </Text>
        )}
        {button && (
          <>
            {btnLoading ? (
              <LoadingButton
                className="mt-3 btn btn-primary btn-icon lft"
                onClick={btnOnClick}
                loading={btnLoading}></LoadingButton>
            ) : (
              <>
                <Button className="mt-3 btn btn-primary btn-icon lft" onClick={btnOnClick}>
                  {btnText}
                </Button>
              </>
            )}
          </>
        )}
      </Box>
    </div>
  );
}
