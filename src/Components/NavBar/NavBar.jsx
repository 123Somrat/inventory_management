import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import { MdOutlineInventory } from "react-icons/md";
export default function NavBar() {
  return (
    <div>
     <Navbar fluid rounded>
      <Navbar.Brand href="/">
      <MdOutlineInventory className='w-8 h-8 mr-2 text-cyan-600'/>
        <span className="self-center whitespace-nowrap text-xl text-cyan-800 dark:text-white">Invokia</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">Login</Navbar.Link>
        <Navbar.Link href="#">Register</Navbar.Link>
        <Navbar.Link href="#">Create Store</Navbar.Link>
        <Navbar.Link href="#">Watch Demo</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>




    </div>
  )
}
