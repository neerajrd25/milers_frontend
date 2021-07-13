import {
  Box,
  Container
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { getProducts } from 'src/api/product.api';
import { COMPANY } from 'src/utils/messages.constants';
import CommodityListResults from '../components/commodity/CommodityListResults';
import CommodityListToolbar from '../components/commodity/CommodityListToolbar';

const CommodityList = () => {
  const { data: { data: listData } } = useQuery(['GetProducts'], () => getProducts());

  return (
    <>
      <Helmet>
        <title>
          Products |
          { `${COMPANY.name}`}
        </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CommodityListToolbar />
          <Box sx={{ pt: 3 }}>
            <CommodityListResults listData={listData} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CommodityList;
