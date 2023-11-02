import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
type Props = {
  children: React.ReactNode;
};

export default function ToastProvider({ children }: Props) {
  return (
    <>
      {children}
      <ToastContainer autoClose={1500} limit={2} />
    </>
  );
}
