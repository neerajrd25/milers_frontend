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
import PropTypes from 'prop-types';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const CommodityListResults = ({ listData, ...rest }) => {
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
                <TableCell>Brand</TableCell>
                <TableCell>Product Type</TableCell>
                <TableCell>User</TableCell>
                <TableCell>More</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listData.slice(0, limit).map((rowData) => (
                <TableRow hover key={rowData.id}>
                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {rowData.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{rowData.brand?.name}</TableCell>
                  <TableCell>{rowData.productType.name}</TableCell>
                  <TableCell>{rowData.productUser}</TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <ArrowRightIcon />
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
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CommodityListResults.propTypes = {
  listData: PropTypes.array.isRequired
};

export default CommodityListResults;
