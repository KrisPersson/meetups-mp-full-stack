import { BASE_URL, logout, saveUser } from './index';

export async function apiSignup(username: string, password: string) {
  try {
    const response = await fetch(BASE_URL + '/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function apiLogin(username: string, password: string) {
  try {
    const response = await fetch(BASE_URL + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    saveUser(data.token, data.username);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function apiGetUserProfile(token: string) {
  try {
    const response = await fetch(BASE_URL + '/me', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status === 401) {
      logout();
    }

    return data;
  } catch (error) {
    return error;
  }
}
