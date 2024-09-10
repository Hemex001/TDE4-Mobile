import axios from 'axios';

export const getAllCountries = () => {
  return axios.get('https://restcountries.com/v3.1/all');
};

export const getCountryByCode = (code: string) => {
  return axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
};
