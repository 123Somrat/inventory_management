import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useContext } from "react";
import { MdOutlineInventory } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/Providers";
export default function NavBar() {
const {logOut} = useContext(AuthContext)
const navigate = useNavigate()
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
            <Dropdown.Item><Link to={"/dashboard"}>Dashboard</Link></Dropdown.Item>
            <Dropdown.Item><Link to={""}>Settings</Link></Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Link href="/" className="hover:text-cyan-800">
            Home
          </Link>
          <Link to={"/auth/login"} className="hover:text-cyan-800">Login</Link>
          <Link to="/auth/register" className="hover:text-cyan-800">Register</Link>
          <Link to="/createshop" className="hover:text-cyan-800">Create Store</Link>
          <Link to="/watchdemo" className="hover:text-cyan-800">Watch Demo</Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
