import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { UserDataProvider } from '@/context/UserDataContext';
import { MemoryProvider } from '@/context/MemoryContext';
import { ThemeProvider } from '@/context/ThemeContext'; // 🧠 Add this import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserDataProvider>
        <MemoryProvider>
          <ThemeProvider> {/* 🧠 Wrap App with ThemeProvider */}
            <App />
          </ThemeProvider>
        </MemoryProvider>
      </UserDataProvider>
    </BrowserRouter>
  </StrictMode>
);
