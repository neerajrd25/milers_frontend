import { ThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { useRoutes } from 'react-router-dom';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import routes from 'src/routes';
import theme from 'src/theme';
import React, { Suspense } from 'react';
import { isLoggedIn } from './api/authentication.api';
import useInterceptor from './auth.interceptor';
import AppSnackbarProvider from './AppSnackbarProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      suspense: true
    },
    mutations: {
      useErrorBoundary: false
    }
  }
});

setLogger({
  error: () => {}
});

const AppReactQueryProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const App = () => {
  const isLogged = isLoggedIn();
  useInterceptor(isLogged);
  const routing = useRoutes(routes(isLogged));

  return (
    <AppReactQueryProvider>
      <AppSnackbarProvider>

        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Suspense fallback={<div isloading> Loading </div>}>
            {' '}
            {routing}
          </Suspense>
        </ThemeProvider>
      </AppSnackbarProvider>

    </AppReactQueryProvider>
  );
};
AppReactQueryProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
