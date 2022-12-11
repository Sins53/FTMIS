import './assets/scss/main.scss';
import PrivateRoute from '@/routes';
import useAuth from './hooks/useAuth';
import protectedRoutes from './routes/protected';
import publicRoutes from './routes/public';
import { ApplicationProvider } from './providers/ApplicationProvider';

import AuthenticationLogoScreen from './authentication/AuthenticatingScreen/AuthenticationLogoScreen';
import ErrorPage from './authentication/500ErrorPage';
import { useUserData } from './genericQueries/userQuery';
// import { usePublicInitData, useUserData } from './genericQueries/userQuery';
// import { PublicProvider } from './providers/PublicProvider';

const App = () => {
  const { isAuthenticated } = useAuth();

  const { isError, isLoading } = useUserData();
  // const { isError: publicError, isLoading: publicLoading } = usePublicInitData();

  if (isAuthenticated) {
    return (
      <ApplicationProvider>
        {isLoading ? (
          <AuthenticationLogoScreen />
        ) : !isLoading && isError ? (
          <ErrorPage />
        ) : (
          <PrivateRoute
            protectedRoutes={true}
            appRoutes={protectedRoutes}
            redirectPath={[{ from: '*', to: '/' }]}
          />
        )}
      </ApplicationProvider>
    );
  } else {
    return (
      <>
        {/* <PublicProvider>
          {publicLoading ? (
            <AuthenticationLogoScreen />
          ) : !publicLoading && publicError ? (
            <ErrorPage />
          ) : ( */}
        <PrivateRoute
          protectedRoutes={false}
          appRoutes={publicRoutes}
          redirectPath={[{ from: '*', to: '/welcome' }]}
        />
        {/* )}
        </PublicProvider> */}
      </>
    );
  }
};

export default App;
