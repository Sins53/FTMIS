import { useTranslation } from 'react-i18next';

export default function useLanguage<T, U>(languageEn: T, languageNe: U) {
  const { i18n } = useTranslation();

  switch (i18n.language) {
    case 'ne':
      return languageNe;
    default:
      return languageEn;
  }
}
