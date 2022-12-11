import { Box, FlexBox, Image } from '@/components/core';
import Layout from '@/components/layout';
import LoadingButton from '@/components/LoadingButton/LoadingButton';
import { Text } from '@/components/core';
import useTimer from '@/hooks/useTimer';
import { publicPath } from '@/routes/public';
import { timeDifference } from '@/utils/utilsFunction/time-difference';
import React, { createRef, FC, KeyboardEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Public from '../Public';
import { CardBox, CardWrapper } from '../Styles/styles';
import { coolGray } from '@/theme/colors';
import { resendOTPResponseData, useOTPVerify, useResendOTP } from './useOTPQuery';
import { getSessionStorage } from '@/utils/utilsFunction/session-storage';
import { OTPSession } from '@/utils/sharedEnum';
import { useTranslation } from 'react-i18next';
import { default as logo } from '@/assets/image/logo.png';

const OTPForm: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  //otp and otp ref states
  const [refs, setRefs] = useState<any>([]);
  const [otpData, setOtpData] = useState<resendOTPResponseData | null>(null);
  const [selectedInputId, setSelectedInputId] = useState(0);
  const [otp, setOtp] = useState<string[]>([]);
  //timer state
  const [timerTime, setTimerTime] = useState(0);
  const { timer, timerEnd, startTimer, setTimerEnd } = useTimer(timerTime);
  const onResendOtp = () => {
    startTimer();
    setTimerEnd(false);
  };
  const { mutate: verifyOTP } = useOTPVerify();
  const { mutate: resendOTP } = useResendOTP(
    otpData,
    setOtpData,
    setSelectedInputId,
    setOtp,
    onResendOtp
  );

  // otp and otp ref functions
  //for backspace
  const onKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Backspace' && selectedInputId > 0 && otp[selectedInputId] == '') {
      const updatedOtp = [...otp];
      updatedOtp[selectedInputId - 1] = '';
      setSelectedInputId(selectedInputId - 1);
      setOtp(updatedOtp);
    }
  };

  // for any input
  const changeHanlder: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (+e.target.value >= 0 && +e.target.value <= 9) {
      const updatedOtp = [...otp];
      updatedOtp[selectedInputId] = e.target.value;
      setOtp(updatedOtp);

      if (selectedInputId < otp.length - 1 && e.target.value) {
        setSelectedInputId(selectedInputId + 1);
      }
    }
  };

  const onFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setSelectedInputId(Number(e.target.id));
  };

  const pasteHandler: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    const pasteData = e.clipboardData.getData('text').split('');

    const updatedOtp = [...otp];
    let tempSelectedInputId = 0;

    pasteData.forEach((char) => {
      if (+char >= 0 && +char <= 9 && tempSelectedInputId < otp.length) {
        updatedOtp[tempSelectedInputId] = char;

        if (!(tempSelectedInputId == otp.length - 1)) {
          tempSelectedInputId++;
        }
      }
    });

    setOtp(updatedOtp);
    setSelectedInputId(tempSelectedInputId);
  };

  const getSessionData = async () => {
    const sessionData = await getSessionStorage(OTPSession);
    setOtpData(sessionData);
  };

  const handleResendClick = async () => {
    const sessionData = await getSessionStorage(OTPSession);
    if (sessionData?.email) {
      resendOTP({ email: sessionData?.email });
      // onResendOtp();
    }
  };
  useEffect(() => {
    if (refs.length > 0 && selectedInputId < refs.length) {
      refs[selectedInputId].current.focus();
    }
  }, [selectedInputId, refs]);
  useEffect(() => {
    getSessionData();
  }, []);

  useEffect(() => {
    const inputFieldArr = [...new Array(otpData?.otp_length)].map((arr, index) => index);
    setRefs(inputFieldArr.map(() => createRef()));
    setOtp(inputFieldArr.map(() => ''));

    if (otpData?.otp_expirytime) {
      const difference = timeDifference(otpData?.otp_expirytime, otpData?.otp_starttime);
      setTimerTime(difference);
    }
    return () => {
      setTimerTime(0);
    };
  }, [otpData?.otp_length, otpData?.otp_starttime, otpData?.otp_expirytime]);

  const onOTPSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    const data = refs
      ?.map((item: any) => item?.current?.value)
      .join('')
      .toString();
    verifyOTP({ otp: data });
  };

  return (
    <>
      <Public>
        <CardBox>
          <Box className="text-center  d-block d-md-none">
            <Image src={logo} height="40" className="mb-3" />
          </Box>
          <CardWrapper>
            <div className="flex-grow-1">
              <div className="position-relative h-100">
                <Layout.Container centered className="px-4">
                  <Box className="text-end">
                    <button
                      role="button"
                      onClick={() => navigate(publicPath.login)}
                      className="btn btn-icon lft text-primary">
                      <i className="small ic-arrow-left mr-1"></i>
                      {t('common:buttons.back')}
                    </button>
                  </Box>
                  <Text variant="h5" typeface="semiBold" color={coolGray[800]} className="my-2">
                    {t('common:OTP')}
                  </Text>
                  <Text variant="display2" color={coolGray[600]} className="mb-4">
                    {t('common:header.login_description')}
                  </Text>
                  <FlexBox className="otp-field mb-4">
                    {refs.map((ref: any, index: number) => {
                      return (
                        <input
                          autoComplete="off"
                          key={index}
                          onPaste={pasteHandler}
                          id={String(index)}
                          onChange={changeHanlder}
                          onFocus={onFocus}
                          ref={refs[index]}
                          onKeyDown={onKeydown}
                          value={otp[index]}
                          size={1}
                          className="mx-1 form-control"
                        />
                      );
                    })}
                  </FlexBox>
                  <FlexBox align="center" justify="space-between">
                    {!timerEnd ? (
                      <Text variant="display2" color={coolGray[600]}>
                        {' '}
                        <>
                          {t('common:OTP Timer')} &nbsp; {timer}
                        </>
                      </Text>
                    ) : (
                      ''
                    )}

                    <button
                      role="button"
                      onClick={() => {
                        handleResendClick();
                      }}
                      className="btn btn-icon lft text-primary">
                      {t('common:Resend OTP')}
                    </button>
                  </FlexBox>
                </Layout.Container>
              </div>
            </div>
            <div className="footer text-end">
              <LoadingButton
                className="btn btn-primary btn-icon rft mt-4"
                onClick={onOTPSubmit}
                disabled={timerEnd}>
                {t('common:buttons.submit')}
              </LoadingButton>
            </div>
          </CardWrapper>
        </CardBox>
      </Public>
    </>
  );
};

export default OTPForm;
