import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/styles';
import { Alert } from '@material-ui/core';

const WAlert = (props) => (
  <Alert icon={false} elevation={8} variant="standard" {...props} />
);

const useStyles = makeStyles(() => ({
  snackbar: {
    top: 60
  },
  root: {
    background: '#373638',
    height: '44px',
    borderRadius: '4px'
  },
  action: {
    color: '#ffffff'
  },
  success: {
    color: '#b0d96e'
  },
  error: {
    color: '#ff7162'
  }
}));

export default function useSnackbar() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [snackBarData, setSnackBarData] = React.useState({
    message: '',
    severity: '',
    duration: 2000
  });

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const success = async (message, duration) => {
    setSnackBarData({
      message,
      severity: 'success',
      duration: duration || 3000
    });
    setOpen(true);
  };

  const error = (message, duration) => {
    setSnackBarData({ message, severity: 'error', duration: duration || 3000 });
    setOpen(true);
  };

  const warning = (message) => {
    setSnackBarData({ message, severity: 'warning' });
    setOpen(true);
  };

  const getSnackBar = () => (
    <Snackbar
      className={classes.snackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={snackBarData.duration}
      onClose={() => setOpen(false)}
    >
      <WAlert
        onClose={handleClose}
        classes={{
          root: classes.root,
          action: classes.action,
          message:
            snackBarData.severity === 'success'
              ? classes.success
              : classes.error
        }}
      >
        {snackBarData.message}
      </WAlert>
    </Snackbar>
  );

  return {
    success,
    error,
    warning,
    getSnackBar
  };
}
