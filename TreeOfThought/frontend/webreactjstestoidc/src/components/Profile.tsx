import React from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>User Profile</h2>
      <p>Welcome, {auth.user?.profile.name || auth.user?.profile.preferred_username || 'User'}!</p>
      
      <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9', overflowX: 'auto' }}>
        <h3>User Claims:</h3>
        <pre>{JSON.stringify(auth.user?.profile, null, 2)}</pre>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button 
          onClick={() => navigate('/')}
          style={{ margin: '0.5rem', padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}
        >
          Back to Home
        </button>
        <button 
          onClick={() => void auth.signoutRedirect()}
          style={{ margin: '0.5rem', padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
