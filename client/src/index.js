import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ✅ Import global and component-level CSS
import './index.css';
import './App.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
