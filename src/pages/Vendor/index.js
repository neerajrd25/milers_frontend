/* eslint-disable max-len */
import { useState } from 'react';
import { Box, Container } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import VendorList from 'src/components/vendor/list';
import { getVendors } from 'src/api/product.api';
import { useNavigate } from 'react-router-dom';
import ListToolbar from '../../components/common/toolbar';

const VendorComponent = () => {
  const {
    data: { data: listData },
  } = useQuery(['getAllVendors'], () => getVendors());
  // const { data: { data: listData } } = useQuery(['GetProducts'], () => getProducts());
  const naviagte = useNavigate();
  const handleClick = () => {
    naviagte('../vendors/add');
  };
  // let inputList = [...listData];
  const [tableData, setTableData] = useState(listData || []);
  const handleSearch = (val) => {
    console.log(val);
    const inputList = listData.filter((obj) => obj.businessName.toLowerCase().includes(val.toLowerCase()));
    setTableData(inputList);
  };
  return (
    <>
      <Helmet>
        <title>Vendors | Palghar Milers</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <ListToolbar
              title="Vendors"
              handleClick={handleClick}
              handleSearch={handleSearch}
              buttonText="Add Vendor"
              showBackButton={false}
            />
            <VendorList listData={tableData} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default VendorComponent;
