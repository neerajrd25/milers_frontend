import { Box, Container } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { COMPANY } from '../../utils/messages.constants';
import AddProductComponent from '../../components/commodity/AddProductComponent';

const AddProductPage = () => {
  const handleSubmit = (formData) => {
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
            <AddProductComponent submit={handleSubmit} defaultValues={{ name: 'neeraj' }} title="Add Product" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AddProductPage;
