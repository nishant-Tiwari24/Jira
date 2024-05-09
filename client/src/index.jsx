import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SnackbarProvider } from 'notistack';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  // <React.StrictMode>
    <SnackbarProvider>
    <App />
    </SnackbarProvider>
  // </React.StrictMode>
);

