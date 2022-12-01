import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/admin/Dashboard';
import Hospital from './pages/admin/Hospital';
import Create from './pages/admin/Create';
import Edit from './pages/admin/Edit';
import Login from './pages/auth/Login';
import Maps from './pages/Maps';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import './assets/scss/App.scss';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/hospital/create" element={<Create />} />
        <Route path="/hospital/:slug/edit" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
