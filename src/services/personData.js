import axios from 'axios';

import authenticationManager from './jwtAuth';

const baseUrl = 'https://rest-api-django-2zdc5jbehq-ue.a.run.app/api';

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

const putPerson = async ({ name, lastName, documentType, document, hobbie, id }) => {
  const data = {
    name,
    last_name: lastName,
    document_type: documentType,
    document,
    hobbie,
  };

  try {
    const result = await fetchData(`${baseUrl}/person/${id}`, 'put', data);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

const deletePerson = async (id) => {
  try {
    const result = await fetchData(`${baseUrl}/person/${id}`, 'delete');
    console.log(result);
    if (result.status === 204) return { id };
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

export { getPerson, postPerson, putPerson, deletePerson };
