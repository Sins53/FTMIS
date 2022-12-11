import { Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
console.log(Navigate);

import AuthenticationLogoScreen from '@/authentication/AuthenticatingScreen/AuthenticationLogoScreen';
import { RouteProperties } from '@/routes/props';
import { usePermissions } from '@/hooks/application';
import { PermissionItem } from '@/genericQueries/genericQueriesSchema';

import UnAuthorized from '@/authentication/UnAuthorized';

interface RenderRouteProps extends RouteProperties {
  redirectPath?: RouteRedirectProps;
}
type RouteRedirectProps = ({ from: string; to: string } | null)[];

const RenderRoute = (props: RenderRouteProps) => {
  const { element: Component } = props;

  return <Component {...props} />;
};

const PrivateRoute = (props: {
  redirectPath?: RouteRedirectProps;
  appRoutes: RouteProperties[];
  animate?: boolean;
  protectedRoutes: boolean;
}) => {
  const location = useLocation();
  const { appRoutes, redirectPath, protectedRoutes } = props;
  const routes: RouteProperties[] = [];

  const getFlatApplicationRoute = (route: RouteProperties) => {
    if (route.children) {
      route.children.map((item) => getFlatApplicationRoute(item));
    } else {
      routes.push(route);
    }
  };

  appRoutes.map((route) => getFlatApplicationRoute(route));

  const accessibleRoute: Array<PermissionItem> | null = [];

  const flatPermission = (route: PermissionItem) => {
    if (route.children.length > 0) {
      route.children.map((child) => flatPermission(child));
    } else {
      accessibleRoute.push(route);
    }
  };

  const permissions = usePermissions();
  permissions?.map((routeItem: PermissionItem) => flatPermission(routeItem));

  const checkPrivilege = (route: RouteProperties) => {
    const checkValidity = (permissionItem: PermissionItem) => {
      return (
        route.screen_codes?.includes(permissionItem.code) &&
        route.user_type?.includes(permissionItem.user_type)
      );
    };
    if (route.whiteList) {
      return <RenderRoute redirectPath={redirectPath} {...route} />;
    } else if (accessibleRoute.some(checkValidity)) {
      return <RenderRoute redirectPath={redirectPath} {...route} />;
    } else return <UnAuthorized />;
  };

  const getNestedRoutes = (protectedRoutes: boolean, route?: RouteProperties) => {
    if (route) {
      return (
        <Route
          path={route.path}
          key={route.path}
          element={
            <Suspense fallback={<AuthenticationLogoScreen />}>
              {!protectedRoutes ? (
                <RenderRoute redirectPath={redirectPath} {...route} />
              ) : (
                checkPrivilege(route)
              )}
            </Suspense>
          }>
          {route?.children?.map((child) => getNestedRoutes(protectedRoutes, child))}
        </Route>
      );
    }
  };

  return (
    <Routes location={location}>
      {appRoutes?.map((route) => getNestedRoutes(protectedRoutes, route))}
      {redirectPath?.length &&
        redirectPath.map(
          (path, index) =>
            path && (
              <Route
                key={index}
                path={path.from}
                element={
                  <Navigate
                    to={path.to}
                    key={index}
                    state={{
                      from: path.from
                    }}
                    replace
                  />
                }
              />
            )
        )}
    </Routes>
  );
};

export default PrivateRoute;
