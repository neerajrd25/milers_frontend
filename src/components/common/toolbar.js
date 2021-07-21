import {
  Box,
  Button,
  Card,
  CardContent, InputAdornment, SvgIcon, TextField, Typography
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { Search as SearchIcon } from 'react-feather';

const ListToolbar = ({ title, handleClick, buttonText }) => (
  <Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Box>
        <Button
          color="primary"
          variant="contained"
          onClick={handleClick}
        >
          {buttonText}
        </Button>

      </Box>
    </Box>
    {/* <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      > */}
    {/* <Button>
        Import
      </Button>
      <Button sx={{ mx: 1 }}>
        Export
      </Button> */}

    {/* </Box> */}
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search Vendor"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
ListToolbar.defaultProps = {
  title: 'List',
  buttonText: 'Add',

};

ListToolbar.propTypes = {
  title: PropTypes.string,
  handleClick: PropTypes.func,
  buttonText: PropTypes.string

};

export default ListToolbar;
