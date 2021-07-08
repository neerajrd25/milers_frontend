import axios from 'axios';

export const signin = (username, password) => axios.post('/api/auth/signin', { username, password })
  .then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

export const signOut = () => {
  localStorage.removeItem('user');
};
