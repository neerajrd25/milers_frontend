import {
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const VendorList = ({ listData, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>GST Number</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>More</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listData.slice(0, limit).map((rowData) => (
                <TableRow hover key={rowData.id}>
                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {rowData.businessName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {rowData.address}
                    {' '}
                    <br />
                    {' '}
                    {rowData.city}
                    ,
                    {' '}
                    <br />
                    {' '}
                    {rowData.pincode}
                    {' '}
                  </TableCell>
                  <TableCell>{rowData.gstNumber}</TableCell>
                  <TableCell>{rowData.contact}</TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <RouterLink to={`/app/vendors/${rowData.id}`}>
                        <ArrowRightIcon />
                      </RouterLink>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={listData.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[1, 5, 10, 25]}
      />
    </Card>
  );
};
VendorList.defaultProps = {
  listData: [],
};

VendorList.propTypes = {
  listData: PropTypes.array
};

export default VendorList;
