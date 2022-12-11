import { getFromLocalStorage, setToLocalStorage } from '@/utils/storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import publicLang from './public';
import enCommon from './common/en.json';
import enFields from './fields/en.json';
import npFields from './fields/np.json';
import npCommon from './common/np.json';
import protectedLang from './protected';
/**
 * Returns data in selected language
 * @param languageEn any data containing english language
 * @param languageNe any data containing nepali language
 */
export function getTextByLanguage<T, U>(languageEn: T, languageNe: U): T | U {
  switch (i18n.language) {
    case 'ne':
      return languageNe;
    default:
      return languageEn;
  }
}

// the translations
const resources = {
  en: {
    translation: {
      hello: 'Hello',
      greet: 'Hello, {{name}}!',
      documentation: 'Go To Documentation'
    },
    ...publicLang.enPublic,
    ...protectedLang.enProtected,
    common: enCommon,
    fields: enFields
  },
  ne: {
    translation: {
      hello: 'नमस्कार',
      greet: 'नमस्कार, {{name}}!',
      documentation: 'दस्तावेजीकरणमा जानुहोस'
    },
    ...publicLang.npPublic,
    ...protectedLang.npProtected,
    common: npCommon,
    fields: npFields
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getFromLocalStorage('language')
      ? getFromLocalStorage('language')
      : setToLocalStorage('language', 'ne'),
    fallbackLng: 'ne',
    ns: ['common'],
    defaultNS: 'common',
    fallbackNS: 'common',
    keySeparator: '.', // we use keys in form ('messages.welcome')

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

/**
 * API request time out message in selected language
 */
export const requestTimeoutLanguage = () => {
  switch (i18n.language) {
    case 'ne':
      return 'सर्भरले प्रतिक्रिया दिन धेरै लामो समय लिइरहेको छ, कृपया केहि बेरमा पुन: प्रयास गर्नुहोस्!';
    default:
      return 'Server is taking too long to respond, please try again in sometime!';
  }
};

/**
 * When no internet or no conection to server message in selected language
 */
export const noConnectionLanguage = () => {
  switch (i18n.language) {
    case 'ne':
      return 'सर्भरले प्रतिक्रिया दिन धेरै लामो समय लिईरहेको छ, यो कम कनेक्टिभटी वा हाम्रो सर्भरहरूको साथ त्रुटि द्वारा हुन सक्छ। कृपया केहि बेरमा पुन: प्रयास गर्नुहोस्!';
    default:
      return 'Server is taking too long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while!';
  }
};

const nepaliCount = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
/**
 * Converts 123456 to 1,23,456
 * @param enNumber Number to convert into Nepali comma separated text
 */
export const nepaliNumeralFormat = (enNumber: number) => {
  // eslint-disable-next-line prefer-const
  let [integer, decimal] = enNumber.toString().split('.');

  let integerBeforeLastThreeDigits = integer.slice(0, integer.length - 3);
  const integerOfLastThreeDigits = integer.slice(integer.length - 3);
  if (integerBeforeLastThreeDigits.length > 2) {
    integerBeforeLastThreeDigits =
      integerBeforeLastThreeDigits.replace(/(\d)(?=(\d{2})+$)/g, '$1,') + ',';
  }

  integer = integerBeforeLastThreeDigits + integerOfLastThreeDigits;

  switch (i18n.language) {
    case 'ne':
      return integer + decimal;
    default:
      return integer + decimal;
  }
};

/**
 * Converts english number to nepali number as string
 * @param numberEn number in english
 */
export const convertEngToNepNumber = (numberEn: number) => {
  return numberEn
    .toString()
    .split('')
    .map((number) => (nepaliCount[+number] ? nepaliCount[+number] : number))
    .join('');
};

/**
 * Converts nepali number to english number as string
 * @param numberEn number text in nepali
 */
export const convertNepToEngNumber = (numberNe: string) => {
  return numberNe
    .split('')
    .map((number: string) =>
      nepaliCount.indexOf(number) > -1 ? nepaliCount.indexOf(number) : number
    )
    .join('');
};

export default i18n;
