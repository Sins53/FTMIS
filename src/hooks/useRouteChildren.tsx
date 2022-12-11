import { RouteProperties } from '@/routes/props';
import { useLocation } from 'react-router-dom';

export default function useRouteChildren(appRoutes: RouteProperties[]) {
  const location = useLocation();
  const routes = appRoutes.find((route) => {
    return route.path === location.pathname;
  });
  return routes;
}
