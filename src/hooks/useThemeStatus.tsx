import { DARK_THEME, DARK_THEME_ID, LIGHT_THEME, LIGHT_THEME_ID } from '@/theme';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/storage';
import { useEffect, useState } from 'react';

export const useThemeStatus = () => {
  const [theme, setTheme] = useState(
    getFromLocalStorage('theme') === LIGHT_THEME_ID ? LIGHT_THEME : DARK_THEME
  );

  const setMode = (id: string) => {
    setToLocalStorage('theme', id);
    if (id === LIGHT_THEME_ID) {
      setTheme(LIGHT_THEME);
    } else {
      setTheme(DARK_THEME);
    }
  };
  const themeToggler = () => {
    getFromLocalStorage('theme') === LIGHT_THEME_ID
      ? setMode(DARK_THEME_ID)
      : setMode(LIGHT_THEME_ID);
  };

  useEffect(() => {
    const localTheme = getFromLocalStorage('theme');
    console.log(localTheme, 'localtheme');
    if (!localTheme || localTheme === LIGHT_THEME_ID) {
      setTheme(LIGHT_THEME);
    } else {
      setTheme(DARK_THEME);
    }
  }, []);
  return { theme, themeToggler, setMode };
};
