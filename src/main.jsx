import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Import Tailwind CSS
import Dashboard from './Dashboard.jsx';  // Import Dashboard component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Dashboard />  {/* Render Dashboard */}
  </React.StrictMode>
);
