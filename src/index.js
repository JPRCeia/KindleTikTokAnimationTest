import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './components/page/error/ErrorPage';

const router = createBrowserRouter([
  {
      path: "/", 
      element: <App />,
      errorElement: < ErrorPage />,
      
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>
);
