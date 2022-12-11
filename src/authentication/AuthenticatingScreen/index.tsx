import React, { ReactElement } from 'react';
// import logo from "../../../assets/image/rapi-money-logo-updated.png";

const AuthenticatingScreenImage = () => {
  return (
    <div className="spinner">
      <div className="boxes">
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
function AuthenticatingScreen(): ReactElement {
  React.useEffect(() => {
    // SSOService.doLogout()
  }, []);
  return (
    <div className="d-flex align-items-center justify-content-center vw-100 vh-100 p-2">
      <div className="d-flex flex-column justify-content-around h-75">
        <div className="flex-center-center flex-column text-center">
          <AuthenticatingScreenImage />

          <h6 className="mt-2" style={{ color: '#009' }}>
            Loading ...
          </h6>
        </div>
      </div>
    </div>
  );
}

export default AuthenticatingScreen;
