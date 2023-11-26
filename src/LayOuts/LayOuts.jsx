import React from 'react'
import SideNavBar from '../Components/SideNavBar/SideNavBar'
import { Outlet } from 'react-router-dom'
import Home from '../Components/Home/Home'
import NavBar from '../Components/NavBar/NavBar'


export default function LayOuts() {
  return (
    <div className='max-w-6xl mx-auto m-4'>
        <div> 
            <NavBar/>
            <div>
               <Outlet/> 
            </div>
        </div>  
    </div>
  )
}
