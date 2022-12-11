import performApiAction from '@/helper/default-action';
import TokenService from '@/services/token-storage';
import { apiList } from '@/store/apiDetails';
import { useMutation } from 'react-query';

const { logout, logoutFromAllDevices } = apiList.userManagement.authentication;

export const useLogout = () => {
  return useMutation(() => {
    return performApiAction(logout, {
      requestData: {
        refresh_token: TokenService.getRefreshToken()
      }
    });
  });
};

export const useLogoutFormAllDevices = () => {
  return useMutation(() => {
    return performApiAction(logoutFromAllDevices);
  });
};
