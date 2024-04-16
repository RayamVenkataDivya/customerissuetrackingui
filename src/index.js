import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import App from './App';
import Dashboard from './features/dashboard/Dashboard';
import Login from './features/user/Login';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AddTicket from './features/dashboard/AddTicket';
import ListTickets from './features/dashboard/ListTickets';
import SignUp from './features/user/SignUp.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"",
        element:<Login></Login>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/signUp",
        element:<SignUp></SignUp>
      },
      {
        path:"/dashboard",
        element:<Dashboard></Dashboard>,
        children:[
          {
            path:"/dashboard/addTicket",
            element:<AddTicket></AddTicket>
          },
          {
            path:"",
            element:<ListTickets></ListTickets>
          },
          {
            path:"/dashboard/listTickets",
            element:<Login></Login>
          }
        ]
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
