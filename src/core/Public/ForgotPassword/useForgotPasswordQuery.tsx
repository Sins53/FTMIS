import { apiList } from '@/store/apiDetails';
import performApiAction from '@/helper/default-action';
import { useMutation } from 'react-query';
import { ForgortPasswordResponse, ForgotPasswordRequestData } from './schemaForgotPassword';
import { useNavigate } from 'react-router-dom';
import { publicPath } from '@/routes/public';
import setSessionStorage from '@/utils/utilsFunction/session-storage';
import { OTPSession } from '@/utils/sharedEnum';

const { forgotPassword } = apiList.general;
const useForgotPasswordQuery = () => {
  const navigate = useNavigate();

  return useMutation(
    (requestData: ForgotPasswordRequestData) =>
      performApiAction<ForgortPasswordResponse>(forgotPassword, { requestData }),
    {
      onSuccess: (response) => {
        if (response?.data?.data) {
          setSessionStorage(OTPSession, response?.data?.data);
          navigate(publicPath.otpForm);
        }
      }
    }
  );
};

export { useForgotPasswordQuery };
