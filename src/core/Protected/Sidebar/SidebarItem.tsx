import Collapse from '@/components/utils/Collapse/Collapse';
import { PermissionItem } from '@/genericQueries/genericQueriesSchema';
import { getTextByLanguage } from '@/i18n/i18n';
import { getTranslatedText } from '@/utils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BsCashCoin } from 'react-icons/bs';
import { BiGlobe } from 'react-icons/bi';
import { FiUserPlus } from 'react-icons/fi';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { RiEqualizerFill, RiProfileLine } from 'react-icons/ri';
import { VscHome, VscGraphLine } from 'react-icons/vsc';
import { CollapseToggler, MenuItem, NestedMenu } from './sidebar-styles';

export const getIcon = (iconKey: string | null) => {
  console.log(iconKey, 'iconkey');
  switch (iconKey) {
    case 'dashboard':
      return <VscHome />;
    case 'master':
      return <RiEqualizerFill />;
    case 'equalization_grant':
      return <VscGraphLine />;
    case 'loan':
      return <BsCashCoin />;
    case 'document':
      return <HiOutlineDocumentText />;
    case 'role':
      return <AiOutlineUserAdd />;
    case 'user':
      return <FiUserPlus />;
    case 'profile':
      return <RiProfileLine />;
    case 'language':
      return <BiGlobe />;
    default:
      return <HiOutlineDocumentText />;
  }
};

interface SidebarItemProps {
  elem: PermissionItem;
  inner?: boolean;
  openedSidebar: {
    parent: string;
    child: string;
  };
  setOpenedSidebar: React.Dispatch<
    React.SetStateAction<{
      parent: string;
      child: string;
    }>
  >;
}

function SidebarItem({ elem, inner, openedSidebar, setOpenedSidebar }: SidebarItemProps) {
  const { i18n } = useTranslation();
  if (elem.children && elem.children.length > 0) {
    return (
      <li key={elem.code}>
        <CollapseToggler
          role="button"
          inner={'true'}
          ariaExpanded={openedSidebar.parent == elem.code || openedSidebar.child == elem.code}
          onClick={(e) => {
            e.stopPropagation();

            if (inner) {
              setOpenedSidebar({
                parent: openedSidebar.parent,
                child: openedSidebar.child == elem.code ? '' : elem.code
              });
            } else {
              setOpenedSidebar({
                parent: elem.code == openedSidebar.parent ? '' : elem.code,
                child: ''
              });
            }
          }}>
          {elem.icon && <>{getIcon(elem.icon)}</>}
          {getTextByLanguage(elem.name, elem.name_np)}
        </CollapseToggler>
        <Collapse isOpen={openedSidebar.parent == elem.code || openedSidebar.child == elem.code}>
          <NestedMenu>
            {elem.children.map((item, index) => {
              return (
                <SidebarItem
                  setOpenedSidebar={setOpenedSidebar}
                  openedSidebar={openedSidebar}
                  elem={item}
                  inner={true}
                  key={elem.code + index}
                />
              );
            })}
          </NestedMenu>
        </Collapse>
      </li>
    );
  }

  return (
    <li key={elem.code}>
      <MenuItem to={elem.url ? elem.url : ''}>
        {elem.icon && <>{getIcon(elem.icon)}</>}
        {getTranslatedText(i18n.language, elem.name, elem.name_np)}
      </MenuItem>
    </li>
  );
}
export default SidebarItem;
