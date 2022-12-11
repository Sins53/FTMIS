import { GenderENUM } from '@/shared/enums';
import { t } from 'i18next';
import logoImg from '../assets/image/Image.png';

export const moduleMethod = [
  { label: 'GET', value: 'get' },
  { label: 'POST', value: 'post' },
  { label: 'DELETE', value: 'delete' },
  { label: 'PUT', value: 'put' }
  // { label: 'PATCH', value: 'patch' }
];

export const dataTypeOption = [
  { value: 'string', label: 'String' },
  { value: 'number', label: 'Number' }
  // { value: 'boolean', label: 'Boolean' },
  // { value: 'object', label: 'Object' }
];

export const generateImageUrl = (backgroundImageUrl: string) => {
  let ImageUrl;
  if (backgroundImageUrl?.length > 10) {
    ImageUrl = logoImg;
  } else {
    ImageUrl = logoImg;
  }
  return ImageUrl;
};

export const getGender = (key: GenderENUM) => {
  switch (key) {
    case GenderENUM.MALE:
      return t('common:profile.male');
    case GenderENUM.FEMALE:
      return t('common:profile.female');
    case GenderENUM.OTHER:
      return t('common:profile.others');
  }
};

export const generateFileUrl = (fileUrl: string) => {
  let fullUrl;
  if (fileUrl) {
    fullUrl = process.env.REACT_APP_STATIC_ENDPOINT + fileUrl;
  }
  return fullUrl;
};

export function upperCaseFirstLetter(word: string) {
  return word.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export const getString = (value: undefined | string | null): string => {
  if (typeof value === 'undefined' || value === null || value === 'null') {
    return '';
  } else {
    return value;
  }
};

export const returnEmptyString = (value: string | undefined | null) => {
  if (value) {
    return value;
  } else return '';
};

export function getTranslatedText<T, U>(language: string, languageEn: T, languageNe: U) {
  switch (language) {
    case 'ne':
      return languageNe;
    default:
      return languageEn;
  }
}

export function subtractYears(numOfYears: number, date = new Date()) {
  const dateCopy = new Date(date.getTime());

  dateCopy.setFullYear(dateCopy.getFullYear() - numOfYears);

  return dateCopy;
}

export function checkIsOther(value: string) {
  switch (value) {
    case 'Other':
    case 'other':
    case 'Others':
    case 'others':
    case 'अरू':
    case 'अन्य':
    case 'अर्को':
      return true;
    default:
      false;
  }
}

export enum BUDGETENUM {
  'Federal to Province' = 'gov_prov',
  'Federal to Localbody' = 'gov_localbody',
  'Province to Localbody' = 'prov_localbody'
}

export function getEnumKeyByEnumValue<T extends { [index: string]: string }>(
  myEnum: T,
  enumValue: string
): keyof T | null {
  const keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : null;
}
