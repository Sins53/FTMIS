import { useNavigate, useMatch } from 'react-router';

interface T {
  [key: string]: any;
}

/**
 * @typedef {Object} RouteParamHelpers
 * @property {Function} setLink - Redirects with encoded params appended to the route
 * @property {Function} getParams - Get decoded params from the route
 */

/**
 * Provides setLink function that redirects by decoding the route params
 * Provides getParams function that returns decoded route parmas
 * @param route route string
 * @returns {RouteParamHelpers}
 */
export function useRouteParams<U>(route: string) {
  const navigate = useNavigate();
  const routeParam = useMatch(route);

  const encodeParams = (params: T) => {
    try {
      return btoa(encodeURIComponent(JSON.stringify(params)));
    } catch (e) {
      return '';
    }
  };

  /**
   * Redirects with encoded params appended to the route
   * @param params params to be encoded in the route
   * @param newTab is the link to be opened in new tab?
   */
  function setLink(params: T, newTab?: boolean) {
    try {
      const encodedParams = encodeParams(params);
      const pageroute = route.replace(new RegExp(/:[A-Za-z0-9]+/), encodedParams);
      newTab ? window.open('#' + pageroute, '_blank') : navigate(pageroute);
    } catch (error) {
      console.error('Error encoding route');
    }
  }
  /** JSON Object string */
  const decodeParams = (params: string | undefined) => {
    if (params) {
      try {
        return JSON.parse(decodeURIComponent(atob(params)));
      } catch (e) {
        return {};
      }
    }
    return null;
  };

  /**
   * Get decoded params from the route
   * @param paramsKey key present in route params
   * @returns any value route previously encoded with
   */
  function getParams(paramsKey: string): U | null {
    if (routeParam?.params && routeParam?.params[paramsKey]) {
      try {
        const decodedParams = decodeParams(routeParam?.params[paramsKey]);
        return decodedParams;
      } catch (error) {
        console.error('Error decoding route');
      }
    }
    return null;
  }

  return {
    setLink: setLink,
    getParams: getParams
  };
}
