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
  console.log(isLoggedIn());
  useInterceptor(isLoggedIn());
  const routing = useRoutes(routes(isLoggedIn()));

  return (
    <AppReactQueryProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Suspense fallback={<div isLoading> Loading </div>}>
          {' '}
          {routing}
        </Suspense>
      </ThemeProvider>
    </AppReactQueryProvider>
  );
};
AppReactQueryProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
