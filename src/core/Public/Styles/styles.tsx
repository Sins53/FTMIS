import { Box, FlexBox } from '@/components/core';
import { base, coolGray } from '@/theme/colors';
import styled from 'styled-components';
import { Text } from '@/components/core';

export const OuterWrapper = styled(Box)`
  height: 100vh;
  width: 100%;
  position: relative;
  @media (max-width: 768px) {
    height: 100%;
  }
`;
export const InnerWrapper = styled(Box)`
  width: 100%;
  height: 100vh;
  position: relative;
  @media (max-width: 768px) {
    height: 100%;
  }
`;
export const HeaderWrapper = styled(FlexBox)`
  position: absolute;
  top: 2rem;
  width: calc(100% - 20%);
  left: 20%;
  z-index: 1;
  @media (max-width: 768px) {
    left: unset;
    width: 100%;
    padding: 0 2rem;
  }
`;

export const PublicNav = styled(FlexBox)`
  position: absolute;
  bottom: 1rem;
  width: calc(100% - 20%);
  left: 20%;
  @media (max-width: 768px) {
    left: unset;
    width: 100%;
    padding: 0 2rem;
  }
`;
export const LeftImageWrapper = styled(Box)`
  width: 100%;
  position: relative;
  height: 100%;
  @media (max-width: 768px) {
    height: 100vh;
  }
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(1, 84, 38, 0.8);
  }
`;
export const LeftContent = styled(Box)`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 35%;
  transform: translate(-50%, -50%);
  @media (max-width: 768px) {
    display: none;
  }
`;
export const RightImageWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 2rem;
  width: 100%;
  height: 100%;
  position: relative;
  background: ${coolGray[200]};

  img {
    position: absolute;
    right: 0;
    bottom: 0;

    display: block;
    @media (max-width: 768px) {
      position: static;
      height: 300px;
    }
  }
`;

export const CardBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 65%;

  transform: translate(-50%, -50%);
  width: 30rem;
  max-height: 550px;
  @media (max-width: 1460px) {
    width: 25rem;
  }
  @media (max-width: 768px) {
    left: 50%;
    top: 55%;
  }
  @media (max-width: 425px) {
    width: 100%;
    padding 0 2rem;
  }
`;
export const CardWrapper = styled(Box)`
  background-color: ${base.white};
  border-radius: 1rem;
  padding: 1.5rem;
  width: 100%;
  box-shadow: 1px 8px 16px rgba(0, 0, 0, 0.04);
  height: 100%;
`;

export const LanguageBox = styled(Box)`
  z-index: 1;
`;

// getStarted

export const IconWrapper = styled(Box)`
  width: 2.5rem;
  height: 2.5rem;
  background: ${coolGray[200]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
export const IconWrapperLg = styled(Box)`
  width: 4.5rem;
  height: 4.5rem;
  background: ${coolGray[200]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  svg {
    color: ${coolGray[600]};
  }
`;

//Register Page
export const PasswordInput = styled(Box)`
  position: relative;
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    svg {
      color: #adb5bd;
      font-size: 1.25rem;
    }
  }
`;
export const WidthContainer = styled(Box)`
   {
    width: 43rem;
    margin: auto;
    // margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}
  }
`;

//otp verfied page
export const Title = styled(Text)`
  font-size: 2rem;
  font-weight: 600;
  color: ${base.primary};
  margin-top: 1rem;
  position: relative;
  &:after {
    content: '';
    margin: auto;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    height: 2px;
    width: 3rem;
    background-color: ${base.primary};
  }
`;
