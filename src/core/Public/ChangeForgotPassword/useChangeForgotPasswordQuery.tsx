import { apiList } from '@/store/apiDetails';
import performApiAction from '@/helper/default-action';
import { useMutation } from 'react-query';
import { ChangeForgotPasswordRequestData } from './schemaChangeFPassword';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { publicPath } from '@/routes/public';

const { changeForgotPassword } = apiList.general;
const useChangeForgotPasswordQuery = () => {
  const navigate = useNavigate();
  const { initialAuthToken } = useAuth();

  return useMutation(
    (requestData: ChangeForgotPasswordRequestData) =>
      performApiAction(changeForgotPassword, { requestData, initialAuthToken }),
    {
      onSuccess: () => {
        navigate(publicPath.login);
      }
    }
  );
};

export { useChangeForgotPasswordQuery };
