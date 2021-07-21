import { Box, Container } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { COMPANY } from '../../utils/messages.constants';
import AddVendorComponent from '../../components/vendor/add';

const AddVendorPage = () => {
  const handleSubmit = (formData) => {
    console.log('SUBmit clicked');
    console.log('formData', formData);
  };

  return (
    <>
      <Helmet>
        <title>
          Add Product |
          { `${COMPANY.name}`}
        </title>
      </Helmet>
      <Box>
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <AddVendorComponent submit={handleSubmit} defaultValues={{ businessName: 'neeraj' }} title="Add Vendor" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AddVendorPage;
