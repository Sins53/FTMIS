import LanguageToggle from '@/core/Public/Welcome/LanguageToggle';
import { ToggleContext } from '@/providers/ToggleProvider';

import { userManagementPath } from '@/routes/protected/userManagement';
import { base, coolGray } from '@/theme/colors';
import classnames from 'classnames';
import React, { ReactElement, useContext, useState } from 'react';
import { BiGlobe } from 'react-icons/bi';
import { IoMdSettings } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { Box, FlexBox, Text } from '../core';
import { getBaseColor } from '../Table';
import ProfileModal from './Profile/ProfileModal';
import Button from '../derived/Buttons/Buttons';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
interface Props {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  settings?: boolean;
  backToList?: boolean;
  download?: boolean;
  downloadComponent?: React.ReactNode;
}

const Head = styled(Box)`
  // height: var(--header-height);
  background-color: ${coolGray[200]};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${coolGray[200]};
`;
const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-radius: 2rem 0 0 0;
  background: ${base.white};
  padding: 1rem 2rem;
`;

export const HeaderTitle = styled(Text)`
  color: ${(props) => getBaseColor(props.theme)};
  font-weight: 600;
  font-size: 1.125rem;
`;

const LeftContainer = styled(Box)`
  display: flex;
  align-items: center;
  // flex-grow: 1;
`;
const RightContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

const ApplicationTitle = styled(Text)`
  color: ${coolGray[800]};
`;
const IconContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  width: 2.25rem;
  border-radius: 50%;
  background-color: ${coolGray[200]};
`;

function HeaderMain(props: Props): ReactElement {
  const { className, title, settings, backToList, download, downloadComponent } = props;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { toggle, toggleSidebar } = useContext(ToggleContext);
  const { t } = useTranslation();

  return (
    <>
      <Head className={classnames(className)}>
        <HeaderContainer>
          <LeftContainer component="div">
            {toggle && (
              <Button className="btn cursor-pointer" onClick={() => toggleSidebar()}>
                <AiOutlineDoubleRight size={20} color={coolGray[600]} />
              </Button>
            )}
            <ApplicationTitle variant="h5" typeface="semiBold">
              {title}
            </ApplicationTitle>
          </LeftContainer>
          {settings && (
            <RightContainer>
              {/* <div className="form-control-icon lft  mr-4 ">
              <input type="text" className="form-control" placeholder="Search" />
              <i className="ic-search "></i>
            </div> */}
              <FlexBox align="center" className="mr-4">
                <BiGlobe size={20} className="text-cool-gray-600 mr-1" />
                <LanguageToggle />
              </FlexBox>

              <div role={'button'} onClick={() => navigate(userManagementPath.profileSettings)}>
                <IconContainer>
                  <IoMdSettings size={20} className="text-cool-gray-600" />
                </IconContainer>
              </div>
            </RightContainer>
          )}
          {(backToList || (download && downloadComponent)) && (
            <FlexBox>
              {backToList && (
                <Button className="btn" onClick={() => navigate(-1)}>
                  <Text variant="display1">{t('common:header.back_to_list')}</Text>
                </Button>
              )}
              {download && downloadComponent && downloadComponent}
            </FlexBox>
          )}
        </HeaderContainer>
      </Head>
      <ProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default HeaderMain;
