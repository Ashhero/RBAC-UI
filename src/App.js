
import React from 'react';
import { Container } from '@mui/material';
import UserManagement from './components/UserManagement';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import RoleManagement from './components/RoleManagement';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    
      <Route path='/' element={<UserManagement/>}></Route>
      {/* <RoleManagement /> */}
    
    </Routes>
    </BrowserRouter>
  );
}

export default App;
