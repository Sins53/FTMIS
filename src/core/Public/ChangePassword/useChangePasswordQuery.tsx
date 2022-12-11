import { apiList } from '@/store/apiDetails';
import performApiAction from '@/helper/default-action';
import { useMutation } from 'react-query';
import { ChangePasswordRequestData } from './schemaChangePassword';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { publicPath } from '@/routes/public';

const { changePassword } = apiList.general;
const useChangePasswordQuery = () => {
  const navigate = useNavigate();
  const { initialAuthToken } = useAuth();

  return useMutation(
    (requestData: ChangePasswordRequestData) =>
      performApiAction(changePassword, { requestData, initialAuthToken }),
    {
      onSuccess: () => {
        navigate(publicPath.login);
      }
    }
  );
};

export { useChangePasswordQuery };
