import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//components
import Layout from "./components/Layout/Layout";
import NewClient, {
  action as newClientAction,
} from "./pages/NewClient/NewClient";
import Index, { loader as loaderClients } from "./pages/Home";
import ErrorPage from "./pages/Error/Error.pages";
import EditClient, {
  loader as loaderParams,
  action as editClientAction,
} from "./pages/EditClient/EditClient";
import {action as deleteClientAction} from "./components/Client/Client";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: loaderClients,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/nuevos",
        element: <NewClient />,
        action: newClientAction,
      },
      {
        path: "/clientes/:id/editar",
        element: <EditClient />,
        loader: loaderParams,
        action: editClientAction,
        errorElement: <ErrorPage />,
      },

      {
        path: "/clientes/:id/eliminar",
        action:deleteClientAction
      },
      {
        path: "*",
        element: <h1>Not a route 404 🤔</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
