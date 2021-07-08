/* eslint-disable import/prefer-default-export */
import { useLocation } from 'react-router-dom';
import { authenticationService } from '../api/authentication.api';

const handleResponse = (response) => {
  const location = useLocation();
  response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        authenticationService.logout();
        location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};
export default handleResponse;
