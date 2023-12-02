import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Router/Router.jsx";
import Providers from "./Providers/Providers.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// craete queryClient
const queryClient = new QueryClient();

// TODO : HAVE TO IMPLEMENT DEPENDS ON MY CONFIG

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </QueryClientProvider>
  </React.StrictMode>
);
