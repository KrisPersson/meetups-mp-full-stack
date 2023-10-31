import { Outlet, useNavigate } from 'react-router-dom';
import React from 'react';
import { apiGetUserProfile } from '../api';
import { APP_URL } from '../utils';
export default function PrivateLayout() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('userToken') || '';
    if (!token) navigate(APP_URL + 'login');
    apiGetUserProfile(token);
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}
