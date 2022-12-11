import { Box, FlexBox, Image } from '@/components/core';

import { usePermissions, useUserDetails } from '@/hooks/application';

import React, { useCallback, useContext, useState } from 'react';
import {
  ItemContainer,
  LeftContainer,
  Menu,
  MenuLanguage,
  RightContainer,
  ShortcutButton,
  SidebarPanel,
  UserContainer
} from './sidebar-styles';
import SidebarItem, { getIcon } from './SidebarItem';

import { default as LogoImg } from '@/assets/image/logo.png';

import Button from '@/components/derived/Buttons/Buttons';
import ProfileModal from '@/components/Header/Profile/ProfileModal';
import useTheme from '@/hooks/useTheme';
import { ToggleContext } from '@/providers/ToggleProvider';
import { userManagementPath } from '@/routes/protected/userManagement';
import { LIGHT_THEME_ID } from '@/theme';
import { coolGray } from '@/theme/colors';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { SidebarIndividualDropdown } from './SidebarProfileDropdown';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from '@/components/utils';
import useAuth from '@/hooks/useAuth';
import useKeyboardShortcut from '@/hooks/useKeyboardShortcut';
import { Tooltip } from 'reactstrap';
import { useTranslation } from 'react-i18next';

function Sidebar() {
  const themeContext = useTheme();
  const isDark = themeContext.id !== LIGHT_THEME_ID;
  console.log(isDark);
  const [openedSidebar, setOpenedSidebar] = React.useState({
    parent: '',
    child: ''
  });
  console.log(openedSidebar, setOpenedSidebar, Menu, SidebarItem);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);
  const permissions = usePermissions();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const userDetailData = useUserDetails();
  const { toggleLanguage } = useContext(ToggleContext);
  const { toggle, toggleSidebar } = useContext(ToggleContext);
  const [languageTooltipIsOpen, setLanguageTooltipIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleLanguageShortcut = useCallback(() => {
    toggleLanguage();
  }, []);
  useKeyboardShortcut(['Control', 'Shift', 'L'], handleLanguageShortcut, {
    overrideSystem: false,
    repeatOnHold: true
  });

  {
    console.log(permissions, userDetailData, 'permissions');
  }

  return (
    <>
      <SidebarPanel toggle={toggle}>
        <ItemContainer>
          <LeftContainer>
            <FlexBox align="center" className="flex-grow-1 mr-2">
              <Image src={LogoImg} width={'100%'} height={'56'} className="logo-image-contain" />
            </FlexBox>
            {!toggle && (
              <Button className="btn cursor-pointer px-0" onClick={() => toggleSidebar()}>
                <AiOutlineDoubleLeft size={20} color={coolGray[600]} />
              </Button>
            )}
          </LeftContainer>
        </ItemContainer>
        <Box className="px-3"></Box>
        {/* <Input placeholder="Search" isNepali /> */}
        <Box className="flex-grow-1 scrollable">
          <Menu>
            <Box className="px-2">
              <MenuLanguage onClick={() => toggleLanguage()}>
                {<>{getIcon('language')}</>}
                {t('common:tabs.language')}
                <ShortcutButton className="btn" id="LanguageToolTip">
                  L
                </ShortcutButton>
              </MenuLanguage>
            </Box>
            <Tooltip
              placement="top"
              target="LanguageToolTip"
              isOpen={languageTooltipIsOpen}
              toggle={() => setLanguageTooltipIsOpen(!languageTooltipIsOpen)}>
              Ctrl + Shift + L to change Language
            </Tooltip>

            {permissions
              ? permissions?.map((routeItem) => {
                  return (
                    <SidebarItem
                      key={routeItem.code}
                      openedSidebar={openedSidebar}
                      elem={routeItem}
                      setOpenedSidebar={setOpenedSidebar}
                    />
                  );
                })
              : null}
          </Menu>
        </Box>

        <FlexBox>
          <ItemContainer>
            <RightContainer>
              <UserContainer>
                <Dropdown isOpen={dropdownOpen} toggle={() => toggleDropdown(!dropdownOpen)}>
                  <DropdownToggle color="default" className="p-0 w-100">
                    {<SidebarIndividualDropdown />}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => {
                        navigate(userManagementPath.profileSettings);
                      }}>
                      Profile
                    </DropdownItem>
                    <DropdownItem divider className="m-0" />
                    <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </UserContainer>
            </RightContainer>
          </ItemContainer>
        </FlexBox>
      </SidebarPanel>
      <ProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Sidebar;
