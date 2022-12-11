import { OptionType } from '@/components/StyledSelect/StyledSelect';
import { getTextByLanguage } from '@/i18n/i18n';
interface Item {
  id?: number;
  name: string;
}
export interface LanguageItem {
  id?: number;
  name_en: string;
  name_np: string;
}
export const generateLabelValueArray = (dataArray: Item[]) => {
  const returnData: OptionType[] = dataArray?.map((item) => {
    return { value: Number(item.id), label: item.name };
  });
  return returnData;
};

export const getLanguageLabelValueArray = (dataArray: LanguageItem[]) => {
  const returnData: OptionType[] = dataArray?.map((item) => {
    return { value: Number(item.id), label: getTextByLanguage(item.name_en, item.name_np) };
  });
  return returnData;
};

export const generateRoleLabelValueArray = (dataArray: any) => {
  const returnData: OptionType[] = dataArray?.map((item: any) => {
    return { value: Number(item.id), label: item.name };
  });
  return returnData;
};
