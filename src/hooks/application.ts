import { ApplicationContext } from '@/providers/ApplicationProvider';
import { PublicContext } from '@/providers/PublicProvider';
import { useContext } from 'react';

const useUserDetails = () => {
  const { user } = useContext(ApplicationContext);
  return user;
};
const usePermissions = () => {
  const { permissions } = useContext(ApplicationContext);
  return permissions;
};
const useThemeToggler = () => {
  const { permissions } = useContext(ApplicationContext);
  return permissions;
};
const usePublicInit = () => {
  const { public_init } = useContext(PublicContext);
  return public_init;
};

export { useUserDetails, usePermissions, useThemeToggler, usePublicInit };
