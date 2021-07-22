import React from 'react';
import PropTypes from 'prop-types';
import { SnackbarContext } from './hooks/useSnackbarContext';
import useSnackbar from './hooks/useSnackbar';

export default function AppSnackbarProvider({ children }) {
  const {
    success, error, warning,
    getSnackBar,
  } = useSnackbar();
  return (
    <SnackbarContext.Provider
      value={{
        success,
        error,
        warning,
      }}
    >
      {children}
      {getSnackBar()}
    </SnackbarContext.Provider>
  );
}

AppSnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
