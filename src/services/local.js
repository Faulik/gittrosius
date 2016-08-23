export const hasAuthToken = () =>
  !!localStorage.authToken;

export const getAuthToken = () =>
  JSON.parse(localStorage.getItem('authToken'));

export const setAuthToken = (token) =>
  localStorage.setItem('authToken', JSON.stringify(token));

export const removeAuthToken = () =>
  localStorage.removeItem('authToken');
