import axios from 'axios';
import authenticationManager from './jwtAuth';

const baseUrl = 'http://localhost:8000/api';

// authethicates the user for entering the dashboard
const login = async (username, password) => {
  const result = await sendData(`${baseUrl}/token/`, {
    username,
    password,
  });
  if (result.status === 200) {
    authenticationManager.updateToken(result.data);
    return result;
  }
  if (result.status === 401) {
    throw new Error('Either the username of password are incorrect');
  }
};

// send a request to refresh the token
const refresh = async (refreshToken) => {
  try {
    console.log(refreshToken);
    const result = await sendData(`${baseUrl}/token/refresh/`, { refresh: refreshToken });
    return { ...result.data, refresh: refreshToken };
  } catch (error) {
    console.error(error);
  }
};

const sendData = async (url, payload) => {
  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const result = await axios.post(url, payload, config);
    return result;
  } catch (error) {
    return error.response;
  }
};

export { login, refresh, sendData };
