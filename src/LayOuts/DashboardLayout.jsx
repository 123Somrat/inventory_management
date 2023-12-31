import React from "react";
import SideNavBar from "../Components/SideNavBar/SideNavBar";
import { Button, Sidebar } from "flowbite-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import useProductCount from "../Hooks/useProductCount";

export default function DashboardLayout() {
  const location = useLocation();
 //const count = useProductCount()
 
  return (
    <div className="max-w-6xl mx-auto h-full">
      <h1 className="text-center p-4">dashboard</h1>
      <div className="flex h-full">
        <aside className="border-none mr-2">
          <SideNavBar />
        </aside>
        
        {/* if path dashboard then we will show how many product he or she added in product collection  */}
        {location.pathname === "/dashboard" 
        &&
        <div className="w-full flex justify-between border-t-2 border-b-2 h-12 bg-red-400" >
        <h1 className=" p-2">you have {0} product</h1> 
        <div>

         <Link  to={"addproduct"} > <h1 className="bg-cyan-700  text-white p-[10px]">Add Product</h1></Link>
        </div>
        </div> }

        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
 