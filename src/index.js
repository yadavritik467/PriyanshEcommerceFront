import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App';
import Context from './context/contex';
import { AuthProvider } from './context/auth';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="659252251104-ahf20a559sph3a6864c7blc3lgsj0061.apps.googleusercontent.com">
      <Context>
        <AuthProvider>

          <App />

        </AuthProvider>
      </Context>
    </GoogleOAuthProvider>
  </React.StrictMode>
);


