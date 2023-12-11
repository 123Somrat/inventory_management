import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import { AuthContext } from "../../Providers/Providers";
import { Button, Table } from "flowbite-react";



export default function Users() {

  
    const axiosbaseUrl = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const [users,setUsers] = useState([])

   useEffect(()=>{
       axiosbaseUrl.get(`/allusers?useremail=${user?.email}`)
       .then(res=>setUsers(res.data))
   },[])






 const sendPromotionalEmail  = (email) =>{
  const userEmail = {email}
  const adminEmail = user?.email;
    console.log(userEmail,adminEmail) 
 axiosbaseUrl.post(`/sendemail?adminEmail=${adminEmail}`,userEmail)
     

 }





  return (
    <div>
            <Table className='drop-shadow-none'>
         <Table.Head>
           
           <Table.HeadCell>User Name</Table.HeadCell>
    
           <Table.HeadCell>User Email</Table.HeadCell>
           <Table.HeadCell>Created At</Table.HeadCell>
           <Table.HeadCell>Role</Table.HeadCell>
           <Table.HeadCell>User Status</Table.HeadCell>
           <Table.HeadCell>Send Promotional Email</Table.HeadCell>
         </Table.Head>
         <Table.Body className="divide-y border-none">
           {
            users?.map((user,id)=><Table.Row key={id} className="bg-white dark:border-gray-700 dark:bg-gray-80">
            <Table.Cell>{user?.userName
}</Table.Cell>
            <Table.Cell  >{user?.email}</Table.Cell>
            <Table.Cell>{user?.createdAt}</Table.Cell>
            <Table.Cell>
            <Table.Cell>{user?.role ? user.role :"null"}</Table.Cell>
            </Table.Cell>
            <Table.Cell>{user?.status ? user.status :"null"}</Table.Cell>
            <Table.Cell>
              <p className="font-medium text-red-600 hover:underline dark:text-cyan-500">
               <Button onClick={()=>sendPromotionalEmail(user?.email)}>Send Email</Button>
              </p>
            </Table.Cell>
          </Table.Row>)


           }
         </Table.Body>
         </Table>
    </div>
  )
}
