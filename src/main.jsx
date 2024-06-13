import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Layouts/Dashboard';
import AuthProvider from './provider/AuthProvider';
import Homepage from './Pages/Homepage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard></Dashboard> ,
    children:[
      {
        path:'/',
        element:<Homepage/>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider><RouterProvider router={router}></RouterProvider></AuthProvider>
  </React.StrictMode>,
)
