import logoImg from '@/assets/image/info-logo.png';
import { Dropdown, DropdownItem, DropdownMenu } from '@/components/utils';

import React, { ReactElement, useState } from 'react';
import { DropdownToggle } from 'reactstrap';
import styled from 'styled-components';
import { Box, Image, Text } from '../core';
import ProfileImage from '../ProfileImage/ProfileImage';
import { getBaseColor } from '../Table';
// import SidebarToggler from '../Sidebar/SidebarToggler';
import { headerStyles } from './headerProps';
import ProfileModal from './Profile/ProfileModal';

const Head = styled(Box)`
  height: var(--header-height);
  background-color: ${headerStyles.backgroundColor};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding-right: 1rem;
`;
const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
  color: white;
  margin-left: 1rem;
`;

function Header(): ReactElement {
  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Head>
        <HeaderContainer>
          <LeftContainer component="div">
            {/* <SidebarToggler icon="ic-menu" /> */}

            <Image src={logoImg} width={'32'} height={'32'} />
            <ApplicationTitle variant="h6">Admin Management System</ApplicationTitle>
          </LeftContainer>
          <RightContainer>
            <Dropdown isOpen={dropdownOpen} toggle={() => toggleDropdown(!dropdownOpen)}>
              <DropdownToggle color="default" caret className="p-0 text-white">
                <ProfileImage
                  width={'40'}
                  height={'40'}
                  className="rounded-circle"
                  onClick={() => toggleDropdown(!dropdownOpen)}
                />

                <Text typeface="semiBold" variant="display1" className="text-white mx-2">
                  Username
                </Text>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => setIsOpen(!isOpen)}>Profile</DropdownItem>
                <DropdownItem divider className="m-0" />
                <DropdownItem onClick={() => console.log('logout')}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </RightContainer>
        </HeaderContainer>
      </Head>
      <ProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Header;
