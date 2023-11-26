import { createBrowserRouter } from "react-router-dom";
import LayOuts from "../LayOuts/LayOuts";
import Home from "../Components/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import CreateShop from "../Pages/CreateShop/CreateShop";
import SideNavBar from "../Components/SideNavBar/SideNavBar";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import WatchDemo from "../Pages/WatchDemo/WatchDemo";


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
         element:<PrivateRoute><CreateShop/></PrivateRoute>
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
  {
    path : "/dashboard",
    element : <SideNavBar/>
  },
  {
    path : "/watchdemo",
    element : <WatchDemo/>
  }


]);

export default router;
