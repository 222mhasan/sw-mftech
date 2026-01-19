import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "aos/dist/aos.css";

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
import IS from "./components/Team/IS/IS.jsx";
import Gallery from "./pages/Gallery.jsx";
import Reports from "./pages/Reports.jsx";
import SouthWest from "./components/Team/IS/SouthWest.jsx";
import SouthEast from "./components/Team/IS/SouthEast.jsx";
import NorthWest from "./components/Team/IS/NorthWest.jsx";
import NorthEast from "./components/Team/IS/NorthEast.jsx";
import Baselocations from "./pages/Baselocations.jsx";
import FA from "./components/Team/FA/FA.jsx";
import DW from "./components/Team/DW/DW.jsx";
import EA from "./components/Team/EA/EA.jsx";



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
        path: "mapLocation",
        element: <Baselocations/>
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
        path: "/ourTeam/FA",
        element: <FA/>
      },
      {
        path: "/ourTeam/EA",
        element: <EA/>
      },
      {
        path: "/ourTeam/DW",
        element: <DW/>
      },
      {
        path: "/ourTeam/IS",
        element: <IS/>
      },
      {
        path: "/ourTeam/IS/southWest",
        element: <SouthWest/>
      },
      {
        path: "/ourTeam/IS/southEast",
        element: <SouthEast/>
      },
      {
        path: "/ourTeam/IS/northEast",
        element: <NorthEast/>
      },
      {
        path: "/ourTeam/IS/northWest",
        element: <NorthWest/>
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
