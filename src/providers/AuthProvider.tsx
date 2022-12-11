import {
  useLogoutFormAllDevices,
  useLogout
} from '@/core/Protected/UserManagement/Profile/UserSetting/authenticationQueries';
import TokenService from '@/services/token-storage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IForgotPasswordRes {
  token: string;
  uid: string;
}
export interface AuthContextInterface {
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string, callback: VoidFunction) => void;
  logout: () => void;
  logoutFromAllDeviceAction: () => void;
  loadingLogout: boolean;
  register: (accessToken: string, refreshToken: string, callback: VoidFunction) => void;
  changePassword: (accessToken: string, callback: VoidFunction) => void;
  changeForgotPasswordAction: (token: string, uid: string, callback: VoidFunction) => void;
  initialAuthToken: string;
  changeForgotPasswordRes?: IForgotPasswordRes;
}
export const AuthContext = React.createContext<AuthContextInterface>({
  isAuthenticated: false,
  login: () => true,
  logout: () => true,
  logoutFromAllDeviceAction: () => true,
  loadingLogout: false,
  register: () => true,
  changePassword: () => true,
  changeForgotPasswordAction: () => true,
  initialAuthToken: '',
  changeForgotPasswordRes: { token: '', uid: '' }
});
interface Props {
  children: React.ReactNode;
}

function AuthProvider(props: Props) {
  const [isAuthenticated, setAuthenticated] = useState(
    TokenService.getAccessToken() ? true : false
  );
  const [initialAuthToken, setInitialAuthToken] = useState('');
  const [changeForgotPasswordRes, setChangeForgotPasswordRes] = useState<IForgotPasswordRes>();

  const { mutate: logoutFromAllDevices, isLoading: loadingLogout } = useLogoutFormAllDevices();
  const { mutateAsync: logoutFromSingleDevice, isLoading: singleLogoutLoading } = useLogout();

  console.log(logoutFromSingleDevice);

  const navigate = useNavigate();

  const login = async (token: string, refresh: string, callback: VoidFunction) => {
    TokenService.setToken(token);
    TokenService.setRefreshToken(refresh);
    // In a production app, we need to send some data (usually username, password) to server and get a token
    // We will also need to handle errors if sign in failed
    // After getting token, we need to persist the token using `SecureStore`
    // In the example, we'll use a dummy token
    setAuthenticated(true);
    callback();
  };

  const changePassword = async (accessToken: string, callback: VoidFunction) => {
    console.log(accessToken, 'accessToken: string');
    setInitialAuthToken(accessToken);

    // In a production app, we need to send some data (usually username, password) to server and get a token
    // We will also need to handle errors if sign in failed
    // After getting token, we need to persist the token using `SecureStore`
    // In the example, we'll use a dummy token
    // setAuthenticated(true);
    callback();
  };

  const changeForgotPasswordAction = async (token: string, uid: string, callback: VoidFunction) => {
    setChangeForgotPasswordRes({ ...changeForgotPasswordRes, token: token, uid: uid });
    callback();
  };

  const logout = async () => {
    const response = await logoutFromSingleDevice();
    if (response.status === 205) {
      setAuthenticated(false);
      TokenService.clearToken();
      navigate('/welcome');
    }
  };
  const logoutFromAllDeviceAction = () => {
    logoutFromAllDevices(undefined, {
      onSuccess: (response) => {
        console.log(response, 'robbed');
        setAuthenticated(false);
        TokenService.clearToken();
        navigate('/welcome');
      }
    });
  };
  const register = async (token: string, refresh: string, callback: VoidFunction) => {
    TokenService.setToken(token);
    TokenService.setRefreshToken(refresh);
    setAuthenticated(true);
    callback();
    // In a production app, we need to send user data to server and get a token
    // We will also need to handle errors if sign up failed
    // After getting token, we need to persist the token using `SecureStore`
    // In the example, we'll use a dummy token
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        register,
        changePassword,
        initialAuthToken,
        changeForgotPasswordAction,
        changeForgotPasswordRes,
        loadingLogout: loadingLogout || singleLogoutLoading,
        logoutFromAllDeviceAction
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
