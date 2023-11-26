import { createBrowserRouter } from "react-router-dom";
import LayOuts from "../LayOuts/LayOuts";
import Home from "../Components/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import CreateShop from "../Pages/CreateShop/CreateShop";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOuts />,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
         path:"/createshop",
         element:<CreateShop/>
      },
      {
        path:"/auth/login",
        element:<Login/>
      },
      {
        path:"/auth/register",
        element:<Register/>
      }
      
    ],
  },


]);

export default router;
