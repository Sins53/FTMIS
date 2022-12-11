import UnAuthorized from '@/authentication/UnAuthorized';
import { useModulePermissionGate } from '@/hooks/useModulePermissionGate';
import { PRIVILEGEMODULE, PRIVILEGESCREEN } from '@/shared/enums/privilege';
export default function withPermission<TProps, TInjectedKeys extends keyof TProps>(
  Component: React.JSXElementConstructor<TProps>,
  //injector: Pick<TProps, TInjectedKeys>,
  screenName: PRIVILEGESCREEN,
  moduleName: PRIVILEGEMODULE | PRIVILEGESCREEN
) {
  const MyComponent = function Injected(props: Omit<TProps, TInjectedKeys>) {
    const permissions = useModulePermissionGate(screenName, moduleName);
    const assignedPermission = Object.values(permissions);
    if (!assignedPermission.some((element) => element === true)) {
      return <UnAuthorized />;
    }

    return <Component {...(props as TProps)} />;
  };
  return MyComponent;
}
