import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Navbar from "./components/Navbar.jsx";
import MonthlyReport from "./pages/MonthlyReport.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import NonCrm from "./pages/NonCrm.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import BaseLocation from "./pages/BaseLocation.jsx";
import PDF from "./components/PDF.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/baseLocation",
        element: <BaseLocation/>
      },
      {
        path: "/pdf",
        element: <PDF/>
      },
      {
        path: "/monthlyReport",
        element: <MonthlyReport />,
      },
      {
        path: "/nonCrm",
        element: <PrivateRoute><NonCrm/></PrivateRoute>
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "/auth/login",
            element: <Login />,
          },
          {
            path: "/auth/register",
            element: <Register />,
          },
          {
            path: "/auth/nonCrm",
            element : <PrivateRoute><NonCrm/></PrivateRoute>
          }
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
