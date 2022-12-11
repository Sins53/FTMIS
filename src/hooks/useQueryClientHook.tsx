import { useQueryClient } from 'react-query';

const useQueryClientHook = () => useQueryClient();

const queryClient = useQueryClientHook;
export default queryClient;
