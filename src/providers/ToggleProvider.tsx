import { setToLocalStorage } from '@/utils/storage';
import React, { useContext, useState } from 'react';
import { I18nContext } from 'react-i18next';
import { DefaultTheme } from 'styled-components';
import { LIGHT_THEME } from '@/theme';
export interface ToggleContextInterface {
  toggle: boolean;
  toggleSidebar: () => void;
  toggleLanguage: () => void;
  themeToggler?: () => void;
  theme?: DefaultTheme;
}
export const ToggleContext = React.createContext<ToggleContextInterface>({
  toggle: false,
  toggleSidebar: () => true,
  toggleLanguage: () => true,
  themeToggler: () => console.log('theme toggler'),
  theme: LIGHT_THEME
});
interface Props {
  children: React.ReactNode;
  themeToggler?: () => void;
  theme?: DefaultTheme;
}
export function ToggleProvider(props: Props) {
  const [toggleState, changeToggleState] = useState(false);
  const { i18n } = useContext(I18nContext);
  const changeState = () => {
    changeToggleState(!toggleState);
  };

  const changeLanguage = () => {
    if (i18n.language === 'ne') {
      setToLocalStorage('language', 'en');
      i18n.changeLanguage('en');
    } else {
      setToLocalStorage('language', 'ne');
      i18n.changeLanguage('ne');
    }
  };
  return (
    <ToggleContext.Provider
      value={{
        toggle: toggleState,
        toggleSidebar: changeState,
        toggleLanguage: changeLanguage,
        themeToggler: props.themeToggler,
        theme: props.theme
      }}>
      {props.children}
    </ToggleContext.Provider>
  );
}
