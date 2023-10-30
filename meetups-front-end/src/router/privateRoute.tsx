import PrivateLayout from './PrivateLayout';
import { Navigate } from 'react-router-dom';
export default function PrivateRoute() {
  const token = localStorage.getItem('userToken') || '';

  return token ? <PrivateLayout /> : <Navigate to='/login' />;
}
