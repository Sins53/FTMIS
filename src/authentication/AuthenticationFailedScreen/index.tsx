import React, { ReactElement } from 'react';

interface Props {
  retry?: () => void;
}

function AuthenticationFailedScreen(props: Props): ReactElement {
  const { retry } = props;

  console.log(retry);

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>500 - Authentication Failed</h2>
        </div>
        {/* <a href="#">Go TO Homepage</a> */}
      </div>
    </div>
  );
}

export default AuthenticationFailedScreen;
