import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SiteSettingProps, SiteSettingResponse } from './schema';

const { getAllSiteSettings, createSiteSettings, editSiteSettings } = apiList.masterData.siteSetting;

export const useSiteSettingData = ({ category }: { category: string | undefined }) =>
  useQuery(
    [getAllSiteSettings.queryKeyName, category],
    () =>
      performApiAction<SiteSettingResponse>(getAllSiteSettings, {
        params: {
          ...removeEmptyValueFromObject({
            category
          })
        }
      }),
    {
      select: (data) => {
        return data.data?.data;
      }
    }
  );

export const useSiteSettingCreator = (isEditable?: boolean) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: SiteSettingProps) => {
      if (isEditable && requestData.id) {
        return performApiAction(editSiteSettings, {
          requestData,
          pathVariables: { id: requestData.id },
          enableSuccessToast: true
        });
      } else {
        return performApiAction(createSiteSettings, {
          requestData,
          enableSuccessToast: true
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllSiteSettings.queryKeyName]);
      }
    }
  );
};
