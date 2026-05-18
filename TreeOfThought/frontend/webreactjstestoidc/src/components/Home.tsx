import React from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>React OIDC SSO Test App</h1>
      <p>
        This is a standalone React application for testing OIDC SSO authentication.
      </p>
      <div style={{ margin: '2rem 0', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', display: 'inline-block', textAlign: 'left' }}>
        <h3>Test Credentials:</h3>
        <ul>
          <li><strong>Username:</strong> admin</li>
          <li><strong>Password:</strong> admin123</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        {auth.isLoading ? (
          <p>Loading authentication state...</p>
        ) : auth.isAuthenticated ? (
          <div>
            <p style={{ color: 'green', fontWeight: 'bold' }}>You are logged in!</p>
            <button 
              onClick={() => navigate('/profile')}
              style={{ margin: '0.5rem', padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}
            >
              Go to Profile
            </button>
            <button 
              onClick={() => void auth.signoutRedirect()}
              style={{ margin: '0.5rem', padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <p>You are not logged in.</p>
            <button 
              onClick={() => void auth.signinRedirect()}
              style={{ margin: '0.5rem', padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              Login with SSO
            </button>
          </div>
        )}
      </div>
      
      {auth.error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          <strong>Authentication Error: </strong> {auth.error.message}
        </div>
      )}
    </div>
  );
};

export default Home;
