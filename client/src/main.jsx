import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { UserDataProvider } from '@/context/UserDataContext';
import { MemoryProvider } from '@/context/MemoryContext'; // ✅ Add this

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserDataProvider>
        <MemoryProvider> {/* ✅ Wrap App with MemoryProvider */}
          <App />
        </MemoryProvider>
      </UserDataProvider>
    </BrowserRouter>
  </StrictMode>
);
