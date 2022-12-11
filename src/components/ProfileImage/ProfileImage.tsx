import { ImgHTMLAttributes } from 'react';
import { Image } from '../core';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
  className?: string;
  image?: string;
}
function ProfileImage(props: ImageProps) {
  const baseHrUrl = 'https://hr.infodev.com.np/image/';
  const currentUserImage = `${baseHrUrl}${props.image}`;
  const defaultImage = 'https://hr.infodev.com.np/image/default-profile-picture.jpg';
  const sanitizeImage = props.image ? currentUserImage : defaultImage;
  return (
    <>
      <Image src={sanitizeImage} {...props}></Image>
    </>
  );
}

export default ProfileImage;
