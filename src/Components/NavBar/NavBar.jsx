import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useContext } from "react";
import { MdOutlineInventory } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/Providers";
import './NavBar.css'
export default function NavBar() {
const {logOut,user} = useContext(AuthContext)
const navigate = useNavigate()

// signout user
  const signOut = () =>{
    // call logout component
       logOut()

    // redirect user to login page after logout
      navigate("/auth/login")
  }




  return (
    <div>
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <MdOutlineInventory className="w-8 h-8 mr-2 text-cyan-600" />
          <span className="self-center whitespace-nowrap text-xl text-cyan-800 dark:text-white">
            Invokia
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item><NavLink to={"dashboard"}>Dashboard</NavLink></Dropdown.Item>
            <Dropdown.Item><NavLink to={""}>Settings</NavLink></Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={signOut}>Log out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <NavLink to="/" className="hover:text-cyan-800">
            Home
          </NavLink>
          {user ? <p className="hover:text-cyan-800" onClick={signOut}>Logout</p> : <NavLink to={"/auth/login"} className="hover:text-cyan-800">Login</NavLink> }
          {user ?<NavLink to={"/dashboard"} className="hover:text-cyan-800">Dashboard</NavLink> :  <NavLink to="/auth/register" className="hover:text-cyan-800">Register</NavLink>}
          <NavLink to="/createshop" className="hover:text-cyan-800">Create Store</NavLink>
          <NavLink  to="/watchdemo" target="_blank" className="hover:text-cyan-800" >Watch Demo</NavLink>
        </Navbar.Collapse>
      </Navbar>
      <>
    
    </>
    </div>
   
  );
}
