import React from "react";
import SideNavBar from "../Components/SideNavBar/SideNavBar";
import { Sidebar } from "flowbite-react";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="max-w-6xl mx-auto bg-gray-300">
      <h1 className="text-center p-4">dashboard</h1>
      <div className="flex">
        <aside className=" bg-red-300 mr-2">
          <SideNavBar />
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
