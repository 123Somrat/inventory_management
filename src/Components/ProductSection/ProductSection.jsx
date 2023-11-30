import React, { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { AuthContext } from '../../Providers/Providers'
import { MdOutlineDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { Table } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoBagCheckOutline } from "react-icons/io5";

export default function ProductSection() {
    const axiosbaseUrl = useAxiosSecure()
    const {user} = useContext(AuthContext);
    const [product,setProduct] = useState([])
    const location =useLocation();

    // getting product data from db 
    useEffect(()=>{
      axiosbaseUrl.get(`/products?email=${user?.email}`)
      .then(res=>setProduct(res.data))
    },[product])
    


 // add item in cart for checkout 
const checkout = (id) =>{
  const productId = id;
  const useremail = user?.email;
  const cartDate = {
       productId,
       useremail
  };

  axiosbaseUrl.post("/carts",cartDate)     
  .then(res=>{
    if(res.data. acknowledged===true){
      Swal.fire({
        title: "success",
        text: "Peoduct successfully added in cart",
         icon: "success"
  
       })
    }
  }).catch(err=>{
    Swal.fire({
      title: "error",
      text: "Product already in cart",
       icon: "error"

     })


  })
}





     // delete product
 const deleteItem = (id) =>{
  // show a alert user want to delete or not
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        // after user confirmation we request backend to delete the product
      }).then(async(result) => {
        if (result.isConfirmed) {
          const res= await axiosbaseUrl.delete(`/products/${id}`)
            if(res.data.deletedCount>0){
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                     icon: "success"
                    });
            }
        }
        // if something wrong then we show a alert also
      }).catch(err=>{
        Swal.fire({
            title: "error!",
            text: "Opps some thing wrong",
             icon: "error"
            });


      })
       
     

    
       
 }


  return (
    <div>
      {
        location.pathname==="/dashboard/productsection" ?  <Table className='drop-shadow-none'>
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
      
       product?.map((product,index)=><Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-80">
       <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
       {<img src={product.imageUrl} className='h-12 w-12 rounded'/>}
       </Table.Cell>
       <Table.Cell className='text-center'>{product.productname}</Table.Cell>
       <Table.Cell className='text-center' >{product.productquantity}</Table.Cell>
       <Table.Cell className='text-center'>{product.saleCount}</Table.Cell>
       <Table.Cell>
         <Link to={`update/${product._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
         <FaUserEdit className='w-[34px] h-[32px] text-cyan-600'/>
         </Link>
       </Table.Cell>
       <Table.Cell>
         <p className="font-medium text-red-600 hover:underline dark:text-cyan-500">
         <MdOutlineDelete className='w-[34px] h-[32px]' onClick={()=>deleteItem(product._id)}/>
         </p>
       </Table.Cell>
     </Table.Row>)
     }
     </Table.Body>
    </Table> :     <Table className='drop-shadow-none w-[250px]'>
          <Table.Head className='px-[12px]'>
            <Table.HeadCell>Product Image</Table.HeadCell>
            <Table.HeadCell>Product id</Table.HeadCell>
            <Table.HeadCell>Product Name</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Discount</Table.HeadCell>
            <Table.HeadCell>Selling Price</Table.HeadCell>
            <Table.HeadCell>Checkout</Table.HeadCell>
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
         <Table.Cell className='text-center'>{product._id}</Table.Cell>
         <Table.Cell className='text-center'>{product.productname}</Table.Cell>
         <Table.Cell className='text-center' >{product.productquantity}</Table.Cell>
         <Table.Cell className='text-center'>{product.discount
}</Table.Cell>
<Table.Cell className='text-center'>{product.sellingPrice}</Table.Cell>
         <Table.Cell>
           <p className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
           <IoBagCheckOutline className='w-[34px] h-[32px]' onClick={()=>checkout(product._id)}/>
           </p>
         </Table.Cell>
       </Table.Row>)
       }
       </Table.Body>
      </Table>
      }
          
    </div>
  )
}
