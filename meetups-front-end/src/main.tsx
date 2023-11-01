import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProfileView from './views/ProfileView/ProfileView';
import LoginSignupView from './views/LoginSignupView/LoginSignUpView';
import MeetupsView from './views/MeetupsView/MeetupsView';
import MeetupDetailView from './views/MeetupDetailView/MeetupDetailView';
import PrivateRoute from './router/privateRoute';
import { APP_URL } from './utils';

const router = createBrowserRouter([
  {
    path: APP_URL,
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <MeetupsView />,
      },
      {
        path: 'detail',
        element: <MeetupDetailView />,
      },
      {
        path: 'profile',
        element: <ProfileView />,
      },
    ],
  },
  {
    path: APP_URL + 'login',
    element: <LoginSignupView />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
