import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 🧠 Context Providers
import { MemoryProvider } from './context/MemoryContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MemoryProvider>
      <App />
    </MemoryProvider>
  </React.StrictMode>
);
