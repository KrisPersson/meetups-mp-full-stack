import { APP_API_URL } from '../utils';

export const BASE_URL = APP_API_URL;
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
