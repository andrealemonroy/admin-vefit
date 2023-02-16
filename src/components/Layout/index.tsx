import React from 'react';

import { NavBar } from '../organisms/Navbar';

export const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className='m-8'>{children}</div>
    </>
  );
};
