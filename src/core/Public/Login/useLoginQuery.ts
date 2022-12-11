import { apiList } from '@/store/apiDetails';
import performApiAction from '@/helper/default-action';
import { useMutation } from 'react-query';
import { ILogin, LoginResponse } from './schemaLogin';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { root } from '@/routes/public';
import { publicPath } from '@/routes/public';
import { OTPSession } from '@/utils/sharedEnum';
import setSessionStorage from '@/utils/utilsFunction/session-storage';

const { login } = apiList.general;

const useLoginQuery = () => {
  const navigate = useNavigate();

  const { login: loginAction, changePassword: changePasswordAction } = useAuth();

  return useMutation(
    (requestData: ILogin) =>
      performApiAction<LoginResponse>(login, { requestData, enableSuccessToast: true }),
    {
      onSuccess: (response) => {
        if (
          response?.data?.data.access &&
          !response?.data?.data?.need_password_change &&
          !response?.data?.data?.otp_flag
        ) {
          loginAction(response?.data?.data?.access, response?.data?.data?.refresh, () =>
            navigate(root)
          );
        } else if (response?.data?.data?.need_password_change) {
          changePasswordAction(response?.data?.data.access ?? '', () =>
            navigate(publicPath.changePassword)
          );
        } else if (response?.data?.data?.otp_flag) {
          const { email, otp_starttime, otp_expirytime, otp_length } = response?.data?.data;
          const resDataToSession = {
            email,
            otp_starttime,
            otp_expirytime,
            otp_length
          };
          setSessionStorage(OTPSession, resDataToSession);
          navigate(publicPath.otpForm);
        }
      }
    }
  );
};

export { useLoginQuery };
