import {useContext} from 'react'
import { useForm } from 'react-hook-form';
import addProduct from "../../../public/Animation - 1701087422030.json"
import Lottie from 'lottie-react';
import { AuthContext } from '../../Providers/Providers';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
export default function AddProduct() {
     const {user} = useContext(AuthContext);
     const axiosbase = useAxiosSecure();
     const navigate =useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } =useForm();
    const url =  `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_APIKEY }`
    
    const onSubmit = async (data) =>{
        const {productname,productlocation,profitmargin,productquantity,productioncost,discount,productdescription} = data;
         const imageFile = {image:data.productimage[0]}
        
         console.log(profitmargin,productquantity,productioncost,discount)
       // store the image in image bb
         const imgLink = await axiosbase.post(url,imageFile,{
              headers : {
                "content-type": "multipart/form-data"
              }
         })
        // image url which is i got from image bb
        const imageUrl = imgLink.data.data.display_url;


          // create the product obj
          const product = {
               useremail : user?.email,
               productname,
               imageUrl,
               productlocation,
               profitmargin,
               productquantity,
               productioncost,
               discount,
               productdescription

          }
       
       // store the product in product collection
       try{
        const productCreateInfo = await axiosbase.post("/products",product);
        if(productCreateInfo.data.acknowledged===true){
            Swal.fire({
               title: "Success!",
               text: "Product added successfully!",
               icon: "success"
            })
        }
        reset()
       }
       catch(err){
        Swal.fire({
          title: "info",
          text: "You added maximun product do you want to increase adding product limit",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/subscription")  
          }
        });

         
       }
    };



  return (
    <div>
        <section className="p-6 dark:bg-gray-800 dark:text-gray-50 mx-auto">
        <form
          className="container flex flex-col mx-auto space-bottom-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
          <Lottie animationData={addProduct} loop={true} className='w-16 h-16 mx-auto'/>
            <p className="text-center text-xs text-cyan-700">
              add product
            </p>
          </div>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md  dark:bg-gray-900">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-4">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="productname" className="text-sm text-cyan-800">
                Product Name
                </label>
                <input
                  id="productname"
                  name="productname"
                  type="text"
                  placeholder="Product Name"
                  className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                  {...register("productname", { required: true, minLength: 7 })}
                />
                {errors.productname && (
                  <span className="text-red-700 block mt-2 ml-2">
                    Product name is required
                  </span>
                )}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="shoplogo" className="text-sm text-cyan-800">
                  Product Image
                </label>
                <input
                  id="productimage"
                  name="productimage"
                  type="file"
                  placeholder="https://"
                  className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                  {...register("productimage", { required: true })}
                />
                {errors.productimage && (
                  <span className="text-red-700 block mt-2 ml-2">
                    Product image is required
                  </span>
                )}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="productlocation" className="text-sm text-cyan-800">
                  Product Location
                </label>
                <input
                  id="productlocation"
                  name="productlocation"
                  type="text"
                  placeholder="Product location"
                  className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                  {...register("productlocation", { required: true })}
                />
                {errors.productlocation && (
                  <span className="text-red-700 block mt-2 ml-2">
                    Product location is required
                  </span>
                )}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="profitmargin" className="text-sm text-cyan-800">
                  Profit Margin
                </label>
                <input
                  id="profitmargin"
                  name="profitmargin"
                  type="number"
                  placeholder="20%"
                  className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                  {...register("profitmargin",{required:true,valueAsNumber: true,min:1})}
                />
                {errors.profitmargin && <span className="text-red-700 block mt-2 ml-2">Profit margin is required</span>}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="owneremail" className="text-sm text-cyan-800">
                  Product Quantity
                </label>
                <input
                  type="number"
                  id="productquantity"
                  name="productquantity"
                  placeholder="Product Quantity"
                  className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                  {...register("productquantity",{required:true,valueAsNumber: true,min:1})}
                />
                {errors.productquantity && <span className="text-red-700 block mt-2 ml-2">Product quantity required</span>}
              </div>

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="description" className="text-sm text-cyan-800">
                  Production Cost
                </label>
                <input
                  id="productioncost"
                  name="productioncost"
                  placeholder="Production Cost"
                  type="number"
                  className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                  {...register("productioncost", {
                    required: true,
                    valueAsNumber: true,
                    min:1
                  })}
                ></input>
                {errors.productioncost && (
                  <span className="text-red-700 block mt-2 ml-2">
                    Production Cost Is Required
                  </span>
                )}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="owneremail" className="text-sm text-cyan-800">
                  Discount
                </label>
                <input
                  id="discount"
                  name="discount"
                  type="number"
                  placeholder="Discount"
                  className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                  {...register("discount",{required:true,valueAsNumber: true,min:1})}
                />
                {errors.discount && <span className="text-red-700 block mt-2 ml-2">Discount is required</span>}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="owneremail" className="text-sm text-cyan-800">
                  Product Description
                </label>
                <input
                  id="productdescription"
                  name="productdescription"
                  type="text"
                  placeholder="Product Description"
                  className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                  {...register("productdescription",{required:true,maxLength:150})}
                />
                {errors.productdescription && <span className="text-red-700 block mt-2 ml-2">Product description is required</span>}
              </div>
            </div>
          </fieldset>

          <button className="px-8 py-3 font-semibold border rounded dark:border-gray-100 w-96 block mx-auto dark:text-gray-100 bg-cyan-700 text-white hover:bg-cyan-800">
           Add Product
          </button>
        </form>
      </section>




    </div>
  )
}
