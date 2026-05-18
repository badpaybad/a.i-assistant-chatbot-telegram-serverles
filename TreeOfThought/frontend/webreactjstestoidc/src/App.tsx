import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import Home from './components/Home';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function CallbackRoute() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated) {
      navigate('/profile', { replace: true });
    } else if (!auth.isLoading && auth.error) {
      navigate('/', { replace: true });
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.error, navigate]);

  return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang xử lý đăng nhập...</div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<CallbackRoute />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
