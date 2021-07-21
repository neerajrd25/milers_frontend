import { Box, Container } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import VendorList from 'src/components/vendor/list';
import { getVendors } from 'src/api/product.api';
import { useNavigate } from 'react-router-dom';
import ListToolbar from '../../components/common/toolbar';

const VendorComponent = () => {
  const { data: { data: listData } } = useQuery(['getAllVendors'], () => getVendors());
  // const { data: { data: listData } } = useQuery(['GetProducts'], () => getProducts());
  const naviagte = useNavigate();
  const handleClick = () => {
    naviagte('../vendors/add');
  };
  console.log('query ', listData);
  return (
    <>
      <Helmet>
        <title>Vendors | Palghar Milers</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <ListToolbar title="Vendors" handleClick={handleClick} buttonText="Add Vendor" />
            <VendorList listData={listData} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default VendorComponent;
