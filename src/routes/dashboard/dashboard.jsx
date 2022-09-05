// import { useEffect } from 'react';
// import { Table } from '@mui/material';

//components
import AppBar from './appbar';

import { Navigate } from 'react-router-dom';
import TablePerson from './table';

function Dashboard({ isLoggin }) {
  if (!isLoggin) return <Navigate to="/login" replace />;

  return (
    <>
      <AppBar />
      <TablePerson />
    </>
  );
}

export default Dashboard;
