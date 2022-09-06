import axios from 'axios';

import authenticationManager from './jwtAuth';

const baseUrl = 'http://localhost:8000/api';

const getPerson = async () => {
  try {
    const result = await fetchData(`${baseUrl}/person/`, 'get');
    console.log(result);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

const postPerson = async ({ name, lastName, documentType, document, hobbie }) => {
  const data = {
    name,
    last_name: lastName,
    document_type: documentType,
    document,
    hobbie,
  };

  try {
    const result = await fetchData(`${baseUrl}/person/`, 'post', data);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchData = async (url, method, data = {}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  var token = await authenticationManager.getAccessToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  try {
    const result = await axios({
      method,
      url,
      headers,
      data,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

export { getPerson, postPerson };
