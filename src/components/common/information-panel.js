import {
  Box, Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  dataItemLabel: {
    opacity: '0.6',
  },
  divider: {
    margin: '20px 0',
    height: '1px',
  },
}));
const InformationPanel = ({
  informationData
}) => {
  const classes = useStyles();

  const renderItem = (key, value) => (
    <Grid item md={6} xs={12} key={key}>
      <Grid container maxWidth>
        <Grid item maxWidth xs={6}>
          <Typography className={classes.dataItemLabel} display="inline" variant="subtitle1">
            {key}
            {' '}
            :
          </Typography>
        </Grid>
        <Grid item>

          <Typography display="inline" variant="subtitle1">
            {` ${value}`}
          </Typography>
        </Grid>
      </Grid>

    </Grid>
  );
  return (
    <Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid
              container
              alignItems="center"
              spacing={1}
            >
              {Object.entries(informationData).map(([key, value]) => renderItem(key, value))}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

InformationPanel.defaultProps = {
  informationData: {}
};

InformationPanel.propTypes = {
  informationData: PropTypes.object
};

export default InformationPanel;
