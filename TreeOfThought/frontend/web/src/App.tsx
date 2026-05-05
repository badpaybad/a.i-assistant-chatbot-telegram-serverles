import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import LoginPage from './modules/auth/pages/LoginPage';
import SignupPage from './modules/auth/pages/SignupPage';
import CQRSTestPage from './modules/cqrs-test/pages/CQRSTestPage';

// Dummy Pages
const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Page</h1>;
const Contact = () => <h1>Contact Page</h1>;

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Auth Routes */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          
          {/* Modules */}
          <Route path="/modules/cqrs-test" element={<CQRSTestPage />} />
          
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
