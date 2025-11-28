import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import NonCrm from "./pages/NonCrm.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import BaseLocation from "./pages/BaseLocation.jsx";
import Templates from "./components/Templates.jsx";
import OurTeam from "./pages/OurTeam.jsx";
import IS from "./components/Team/IS.jsx";
import Gallery from "./pages/Gallery.jsx";
import Reports from "./pages/Reports.jsx";


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
        path: "/ourTeam",
        element: <OurTeam/>
      },
      {
        path: "/baseLocation",
        element: <BaseLocation/>
      },
      {
        path: "/templates",
        element: <Templates/>
      },
      {
        path: "/monthlyReport",
        element: <Reports />,
      },
      {
        path: "/nonCrm",
        element: <PrivateRoute><NonCrm/></PrivateRoute>
      },
      {
        path: "/gallery",
        element: <Gallery/>
      },
      {
        path: "/ourTeam/IS",
        element: <IS/>
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
