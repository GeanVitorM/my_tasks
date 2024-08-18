import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
