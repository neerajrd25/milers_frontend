/* eslint-disable no-debugger */
import { Box, Container } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { getOneVendor } from 'src/api/product.api';
import { useNavigate, useParams } from 'react-router-dom';
// import dayjs from 'dayjs';
import DetailBar from '../../components/common/detailbar';
import InformationPanel from '../../components/common/information-panel';

const VendorDetailPage = () => {
  const { id } = useParams();
  const {
    data: { data },
  } = useQuery(['getOneVendor'], () => getOneVendor(id));
  const navigate = useNavigate();

  console.log(id);
  const {
    businessName,
    ownerFirstName,
    ownerLastName,
    gstNumber,
    address,
    city,
    pincode,
    contact,
  } = data;
  const informationData = {
    'Owner Name': `${ownerFirstName} ${ownerLastName}`,
    'GST Number': `${gstNumber}`,
    Contact: contact,
    Address: `${(address || '').toUpperCase()}, ${city}. Pin-${pincode}`,
    // 'Date Of Eastablishment': dayjs(dateOfEstablishment).format('DD-MM-YYYY')
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
            <DetailBar
              title={businessName}
              // subTitle="Vendor"
              showBackButton
              handleBackButton={() => {
                console.log('back nbutton');
                navigate('../../vendors', { replace: true });
              }}
              showEndButton
              endButtonText="Edit"
            />
            <InformationPanel informationData={informationData} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default VendorDetailPage;
