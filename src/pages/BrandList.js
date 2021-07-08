import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import BrandListToolbar from 'src/components/brand/BrandListToolbar';
// import Brands from 'src/__mocks__/Brands';
import { useQuery } from 'react-query';
import BrandListResults from 'src/components/brand/BrandListResults';
import { getBrands } from '../api/product.api';

const BrandList = () => {
  const { data: { data } } = useQuery(['GetBrands'], () => getBrands());
  console.log(data);
  return (
    <>
      <Helmet>
        <title>Brands | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <BrandListToolbar />
          <Box sx={{ pt: 3 }}>
            {data && data.length > 0 && <BrandListResults brands={data} /> }
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BrandList;
