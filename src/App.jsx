import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import LandingPage from './components/LandingPage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} /> {/* Landing Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
