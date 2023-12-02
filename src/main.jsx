import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Router/Router.jsx";
import Providers from "./Providers/Providers.jsx";
import { QueryClientProvider,QueryClient} from "@tanstack/react-query";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
// craete queryClient
const queryClient = new QueryClient()
// import loadstripe from react stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PRIVATE_KEY);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Elements stripe={stripePromise} options={options}>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
      </Elements>
    </QueryClientProvider>
  </React.StrictMode>
);
