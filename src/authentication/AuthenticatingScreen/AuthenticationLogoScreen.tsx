import React, { ReactElement } from 'react';
import { default as logo } from '@/assets/image/logo.png';
import { FlexBox, Image } from '@/components/core';

// export const AuthenticatingScreenImageLogo = () => {
//   return <Image src={logo} height={'200'}></Image>;
// };
function AuthenticationLogoScreen(): ReactElement {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 w-100 p-2">
      <div className="d-flex flex-column justify-content-around h-75">
        <FlexBox align="center" justify="space-between">
          {/* <AuthenticatingScreenImageLogo /> */}
          <Image src={logo} height={'80'}></Image>
        </FlexBox>
      </div>
    </div>
  );
}

export default AuthenticationLogoScreen;
