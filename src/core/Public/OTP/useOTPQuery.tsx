import { apiList } from '@/store/apiDetails';
import performApiAction, { BasicResponse } from '@/helper/default-action';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { publicPath } from '@/routes/public';
import useAuth from '@/hooks/useAuth';

export interface IVerifyOTP {
  otp: string;
}
export interface IResendOTP {
  email: string;
}

export interface ResendOTPResponse extends BasicResponse {
  data: resendOTPResponseData;
}
export interface resendOTPResponseData {
  email: string;
  otp_starttime: string;
  otp_expirytime: string;
  otp_length: number;
  otp: string;
}

export interface OTPResponse extends BasicResponse {
  data: OTPResponseData;
}
export interface OTPResponseData {
  forgot_password_flag: boolean;
  email: string;
  otp_starttime: string;
  otp_expirytime: string;
  otp_length: number;
  otp: string;
  access: string;
  token: string;
  uid: string;
}
const { verifyOTP, resendOTP } = apiList.general;

const useOTPVerify = () => {
  const navigate = useNavigate();
  const { changeForgotPasswordAction } = useAuth();

  return useMutation(
    (requestData: IVerifyOTP) => performApiAction<OTPResponse>(verifyOTP, { requestData }),
    {
      onSuccess: (response) => {
        if (response?.data?.data?.forgot_password_flag) {
          changeForgotPasswordAction(response?.data?.data.token, response?.data?.data.uid, () =>
            navigate(publicPath.changeForgotPassword)
          );
        } else {
          navigate(publicPath.otpSuccess);
        }
      }
    }
  );
};

const useResendOTP = (
  otpData: resendOTPResponseData | null,
  setOtpData: React.Dispatch<React.SetStateAction<resendOTPResponseData | null>>,
  setSelectedInputId: React.Dispatch<React.SetStateAction<number>>,
  setOtp: React.Dispatch<React.SetStateAction<string[]>>,
  onResendOtp: () => void
) => {
  return useMutation(
    (requestData: IResendOTP) => performApiAction<ResendOTPResponse>(resendOTP, { requestData }),
    {
      onSuccess: (res) => {
        if (res?.data?.data) {
          setSelectedInputId(0);
          setOtp([]);
          setOtpData(null);
          setOtpData({ ...otpData, ...res.data.data });
          onResendOtp();
        }
      }
    }
  );
};

export { useOTPVerify, useResendOTP };
