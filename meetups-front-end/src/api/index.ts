export const BASE_URL =
  'https://6lv4v5i9j8.execute-api.eu-north-1.amazonaws.com/api';
export * from './meetups';
export * from './user';

export function logout() {
  localStorage.setItem('userToken', '');
  localStorage.setItem('username', '');
  window.location.reload();
}

export function saveUser(token: string = '', username: string = '') {
  localStorage.setItem('userToken', token);
  localStorage.setItem('username', username);
}
