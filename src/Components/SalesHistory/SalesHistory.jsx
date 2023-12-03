import React, { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { AuthContext } from '../../Providers/Providers';
import { Table } from "flowbite-react";
export default function SalesHistory() {
      const axiosbaseUrl = useAxiosSecure();
      const {user} = useContext(AuthContext)
      const [salesDate,setSalesDate] = useState([])
      useEffect(()=>{
              axiosbaseUrl.get(`/saleshistory?useremail=${user?.email}`)
              .then(res=>setSalesDate(res.data))
      },[])

  return (
    <div>
     
         <Table className='drop-shadow-none'>
         <Table.Head>
           
           <Table.HeadCell>Product Name</Table.HeadCell>
    
           <Table.HeadCell>Selling Date</Table.HeadCell>
           <Table.HeadCell>profit</Table.HeadCell>
           <Table.HeadCell>
             <span className="sr-only">Edit</span>
           </Table.HeadCell>
         </Table.Head>
         <Table.Body className="divide-y border-none">
       {
           salesDate.map((data,id)=><Table.Row key={id} className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
        
           <Table.Cell >{data.productname}</Table.Cell>
           <Table.Cell >{data.salesdate}</Table.Cell>
           <Table.Cell>{(data.sellingPrice*data.saleCount)-(data.productioncost*data.saleCount)}</Table.Cell> 
         </Table.Row>)

       }
     </Table.Body>
    </Table>



     
    </div>
  )
}
