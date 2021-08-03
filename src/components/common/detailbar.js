import {
  Box,
  Button, IconButton, Paper, Typography
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { PropTypes } from 'prop-types';

const DetailBar = ({
  title, subTitle, handleBackButton, showBackButton, showEndButton, endButtonText,
}) => (
  <Paper
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: 1
    }}
  >
    {/* <Card>
      <CardContent> */}
    <Box>
      <Typography variant="h4" gutterBottom>
        {showBackButton && (
          <IconButton aria-label="back" onClick={handleBackButton}>
            <ArrowBack />
          </IconButton>
        )}
        {title}
      </Typography>
      {subTitle && (
      <Typography
        align="left"
        variant="h6"
        mx={5}
      >
        {subTitle}
      </Typography>
      )}
    </Box>
    {showEndButton && (
      <Box>
        <Button color="primary" variant="contained" onClick={null}>
          {endButtonText}
        </Button>
      </Box>
    )}
  </Paper>
);
DetailBar.defaultProps = {
  title: 'List',
  showBackButton: false,
  showEndButton: false,
  endButtonText: '',
  subTitle: '',
};

DetailBar.propTypes = {
  title: PropTypes.string,
  handleBackButton: PropTypes.func,
  endButtonText: PropTypes.string,
  showBackButton: PropTypes.bool,
  showEndButton: PropTypes.bool,
  subTitle: PropTypes.string
};

export default DetailBar;
