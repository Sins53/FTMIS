import { FailToast } from '@/components/ToastNotifier/ToastNotifier';

interface AuthTokenService {
  setToken: (token: string) => void;
  getAccessToken: () => any;
  getRefreshToken: () => string;
  clearToken: () => void;
  setRefreshToken: (token: any) => void;
  setUserDetails: (obj: any) => void;
  getUserDetails: () => any;
}

function clearToken() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userDetails');
  localStorage.removeItem('customerLoanTab');
  localStorage.removeItem('activeStatus');
  localStorage.removeItem('activeTab');
}

const encodeToken = (token: string) => {
  try {
    const tokenWithBrowserData = JSON.stringify({ tkvrt: token });
    const tokenWithBrowserDataEncoded = btoa(tokenWithBrowserData);
    const tokenWithBrowserDataEncodedSplit = [
      tokenWithBrowserDataEncoded.substring(0, 20),
      tokenWithBrowserDataEncoded.substring(20)
    ]
      .reverse()
      .join('');

    return tokenWithBrowserDataEncodedSplit;
  } catch (e) {
    console.log('Error encoding token', e);
    return token;
  }
};

const decodeToken = (token: string) => {
  if (!token) return '';

  try {
    const tokenWithBrowserDataEncodedSplit = [
      token.substring(0, token.length - 20),
      token.substring(token.length - 20)
    ]
      .reverse()
      .join('');
    const tokenWithBrowserData = atob(tokenWithBrowserDataEncodedSplit);
    const { tkvrt } = JSON.parse(tokenWithBrowserData);

    return tkvrt;
  } catch (e) {
    console.log('Error decoding token', e);

    clearToken();
    FailToast('Your session has expired.');
    return token;
  }
};

function setToken(token: string) {
  try {
    localStorage.setItem('accessToken', encodeToken(token));
  } catch (e) {
    console.log('Local Store error', e);
  }
}

function getAccessToken(): string {
  let accessToken = '';
  try {
    accessToken = decodeToken(localStorage.getItem('accessToken') || '');
  } catch (e) {
    console.log('Local Store error', e);
  }
  return accessToken;
}

function getRefreshToken(): string {
  let refreshToken = '';
  try {
    refreshToken = decodeToken(localStorage.getItem('refreshToken') || '');
  } catch (e) {
    console.log('Local Store error', e);
  }
  return refreshToken;
}

function setRefreshToken(tokenObj: any) {
  try {
    localStorage.setItem('refreshToken', encodeToken(tokenObj));
  } catch (e) {
    console.log('Local Store error', e);
  }
}

function getUserDetails(): any {
  let userDetail;
  try {
    userDetail = decodeToken(localStorage.getItem('userDetails') || '');
  } catch (e) {
    console.log('Local Store error', e);
  }
  return userDetail;
}

function setUserDetails(obj: any) {
  try {
    localStorage.setItem('userDetails', encodeToken(obj));
  } catch (e) {
    console.log('Local Store error', e);
  }
}

const TokenService: AuthTokenService = {
  setToken,
  getAccessToken,
  getRefreshToken,
  clearToken,
  setRefreshToken,
  setUserDetails,
  getUserDetails
};
export default TokenService;
