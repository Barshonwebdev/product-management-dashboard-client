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
import MyProducts from './Pages/MyProducts';
import AddProduct from './Pages/AddProduct';
import BuyProduct from './Pages/BuyProduct';
import EditProduct from './Pages/EditProduct';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard></Dashboard> ,
    children:[
      {
        path:'/',
        element:<Homepage/>
      },
      {
        path:'/myproducts',
        element:<PrivateRoute><MyProducts/></PrivateRoute>
      },
      {
        path:'/addproduct',
        element:<PrivateRoute><AddProduct/></PrivateRoute>
      },
      {
        path:'/buyproduct/:id',
        element:<PrivateRoute><BuyProduct/></PrivateRoute>,
        loader:({params})=>fetch(`http://localhost:5000/buyproduct/${params.id}`)
      },
      {
        path:'/editproduct/:id',
        element:<PrivateRoute><EditProduct/></PrivateRoute>,
        loader:({params})=>fetch(`http://localhost:5000/products/edit/${params.id}`)
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
