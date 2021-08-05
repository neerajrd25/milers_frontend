import { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Card,
  CardContent, InputAdornment, SvgIcon, TextField, Typography,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { Search as SearchIcon } from 'react-feather';
import ArrowBack from '@material-ui/icons/ArrowBack';

const ListToolbar = ({
  title, handleClick, buttonText, showBackButton, handleSearch,
}) => {
  const [searchKey, setSearchedKey] = useState('');

  const onChange = ({ target: { value } }) => {
    setSearchedKey(value.trim());
    if (value === '') handleSearch('');
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4" gutterBottom>
          {showBackButton && (
            <IconButton aria-label="back">
              <ArrowBack />
            </IconButton>
          )}
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
                value={searchKey}
                onChange={onChange}
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
                  ),
                }}
                placeholder="Search Vendor"
                variant="outlined"
                onKeyUp={(event) => event.key === 'Enter' && handleSearch(searchKey)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
ListToolbar.defaultProps = {
  title: 'List',
  buttonText: 'Add',
  showBackButton: false,

};

ListToolbar.propTypes = {
  title: PropTypes.string,
  handleClick: PropTypes.func,
  buttonText: PropTypes.string,
  showBackButton: PropTypes.bool,
  handleSearch: PropTypes.func,

};

export default ListToolbar;
