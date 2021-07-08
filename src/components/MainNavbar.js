import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Logo from './Logo';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '5px',
    minHeight: '50px',
  },
}));
const MainNavbar = (props) => {
  const classes = useStyles();

  return (

    <AppBar
      elevation={0}
      {...props}
    >
      <Toolbar sx={{ height: 44 }} className={classes.root}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};
export default MainNavbar;
