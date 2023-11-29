import React, { useContext, useState } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { AuthContext } from '../../Providers/Providers'

import { Table } from "flowbite-react";

export default function ProductSection() {
    const axiosbaseUrl = useAxiosSecure()
    const {user} = useContext(AuthContext);
    const [product,setProduct] = useState([])
    // getting product data from axios
     axiosbaseUrl.get(`/products?email=${user?.email}`)
     .then(res=>setProduct(res.data))

  return (
    <div>
          <Table className='drop-shadow-none'>
          <Table.Head>
            <Table.HeadCell>Product Image</Table.HeadCell>
            <Table.HeadCell>Product Name</Table.HeadCell>
            <Table.HeadCell>Product Quantity</Table.HeadCell>
            <Table.HeadCell>Sales Count</Table.HeadCell>
            <Table.HeadCell>Update</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y border-none">
       {
        
         product?.map((product,index)=><Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
         <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
         {<img src={product.imageUrl} className='h-12 w-12 rounded'/>}
         </Table.Cell>
         <Table.Cell className='text-center'>{product.productname}</Table.Cell>
         <Table.Cell className='text-center' >{product.productquantity}</Table.Cell>
         <Table.Cell className='text-center'>{product.saleCount}</Table.Cell>
         <Table.Cell>
           <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
             update
           </a>
         </Table.Cell>
         <Table.Cell>
           <a href="#" className="font-medium text-red-600 hover:underline dark:text-cyan-500">
             delete
           </a>
         </Table.Cell>
       </Table.Row>)
       }
       </Table.Body>
      </Table>
    </div>
  )
}
