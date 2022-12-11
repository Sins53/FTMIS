import { Text } from '@/components/core';
import { ToggleContext } from '@/providers/ToggleProvider';

import { base } from '@/theme/colors';
import { getFromLocalStorage } from '@/utils/storage';
import { useContext, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

interface toggleProps {
  status?: boolean;
}
const LanguageToggle = (props: toggleProps) => {
  const { status } = props;
  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);

  const { toggleLanguage } = useContext(ToggleContext);

  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={() => toggleDropdown(!dropdownOpen)}>
        <DropdownToggle color="default" className="p-0">
          <Text variant="h5" color={status === true ? base.white : base.primary}>
            {getFromLocalStorage('language') === 'ne' ? 'NP' : 'EN'}

            <IoIosArrowDown className="ml-2" />
          </Text>
        </DropdownToggle>
        <DropdownMenu className="dropdown-sm">
          <DropdownItem
            onClick={() => {
              toggleLanguage();
            }}>
            {getFromLocalStorage('language') === 'ne' ? 'EN' : 'NP'}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};
export default LanguageToggle;
