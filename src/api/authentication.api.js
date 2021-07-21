/* eslint-disable no-debugger */
import axios from 'axios';
import jwt from 'jwt-decode';
// import dependency

const { REACT_APP_API_BASE_URL } = process.env;

export const signIn = (data) => axios.post(`${REACT_APP_API_BASE_URL}auth/login`, data)
  .then((response) => {
    console.log(response);
    if (response.data.token) {
      localStorage.setItem('USER', JSON.stringify(response.data));
    }
    return response.data;
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

export const signOut = () => {
  localStorage.removeItem('USER');
};

export const isLoggedIn = () => {
  const user = localStorage.getItem('USER');
  let result = false;
  if (user) {
    const { token } = JSON.parse(user);
    const decodedToken = jwt(token);
    const currentDate = new Date();
    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log('Token expired.');
    } else {
      // console.log('Valid token');
      result = true;
    }
  }
  return result;
};
