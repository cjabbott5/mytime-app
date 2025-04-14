// 📁 client/src/Root.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserDataProvider } from './context/UserDataContext';
import { MemoryProvider } from './context/MemoryContext';
import App from './App';

const Root = () => (
  <Router>
    <AuthProvider>
      <UserDataProvider>
        <MemoryProvider>
          <App />
        </MemoryProvider>
      </UserDataProvider>
    </AuthProvider>
  </Router>
);

export default Root;
