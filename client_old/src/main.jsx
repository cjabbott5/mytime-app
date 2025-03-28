// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { MemoryProvider } from './context/MemoryContext'; // 🧠 new memory context

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MemoryProvider> {/* 🧠 wrap for global memory access */}
      <App />
    </MemoryProvider>
  </React.StrictMode>
);
