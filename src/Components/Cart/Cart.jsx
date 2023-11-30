import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import { AuthContext } from "../../Providers/Providers";
import Lottie from "lottie-react";
import emptyCart from "../../../public/Animation - 1698835746643.json"
import { Button, Table } from 'flowbite-react'
import moment from "moment";
import Swal from "sweetalert2";
export default function Cart() {
     const axiosbaseUrl = useAxiosSecure();
      const {user} = useContext(AuthContext)
      const [cart,setCart] = useState()

      // get the cart item from backend depends on user
    useEffect(()=>{
        axiosbaseUrl.get(`/carts?useremail=${user?.email}`)
        .then(res=>setCart(res.data))

    },[cart])
     
    // create getPaid function
    const getPaid = async() =>{

        const saledproductId = cart.map(product=>product._id);

       // salesTime and salesDate for when the product sale
         const salesTime = moment().format("h:mm:ss a");
         const salesDate = moment().format("MMM Do YY");
         const salesProductData = {
            useremail:user?.email,
            salesTime,
            salesDate,
            saledproductId 
         
         };
       
        
        // send the saledProduct id in sales collection
        try{
            const salesConfirmation = await axiosbaseUrl.post("/salescollections",salesProductData)
            if(salesConfirmation.data.deletedCount>0){
               Swal.fire({
                   title: "Success!",
                   text: "Successfully placed your order!",
                   icon: "success"
                })      
            }
        }catch(err){
            Swal.fire({
                title: "error!",
                text: "SomeThing is wrong in our side!",
                icon: "error"
             }) 
        }
       
    }
 





  return (
    <div className="flex flex-wrap gap-2">
           {
              cart?.length==0 ? <><Lottie animationData={emptyCart} loop={true} className="w-[350px] h-[400px] mx-auto"/></>
              : <div className="w-full">
                   <Table className='drop-shadow-none'>
        <Table.Head>
          <Table.HeadCell>Product Image</Table.HeadCell>
          <Table.HeadCell>Product Name</Table.HeadCell>
          <Table.HeadCell>product Price</Table.HeadCell>
          <Table.HeadCell>Discount</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y border-none">
        {
        
        cart?.map((product,index)=><Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {<img src={product.imageUrl} className='h-12 w-12 rounded'/>}
        </Table.Cell>
        <Table.Cell >{product.productname}</Table.Cell>
        <Table.Cell >{product.sellingPrice}</Table.Cell>
        <Table.Cell >{product.discount
}</Table.Cell>

      </Table.Row>)
      }
        </Table.Body>
           </Table>
              </div>
           }

      {cart?.length>0 &&  <Button className="mx-auto" onClick={getPaid}>Get Paid</Button>}
    </div>
  )
}
