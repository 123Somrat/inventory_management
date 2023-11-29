import { useLoaderData, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserEdit } from "react-icons/fa";
import { AuthContext } from "../../Providers/Providers";
import Swal from "sweetalert2";

export default function UpdateProduct() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGEBB_APIKEY
  }`;
  const {user} = useContext(AuthContext)
  const productInfo = useLoaderData();

  // import axios base url
  const axiosbase = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = { image: data.productimage[0] };

    // store the image in image bb
    const imgLink = await axiosbase.post(url, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // image url which is i got from image bb
    const imageUrl = imgLink.data.data.display_url;
    const { productname, productlocation, productdescription,productioncost,productquantity,profitmargin,discount} = data;
    
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
       
        
    // update the product in product collection
    try{
        const productUpdateInfo =  await axiosbase.patch(`/products/${productInfo._id}`,product);
       
    
        if(productUpdateInfo.data.modifiedCount>0){
            Swal.fire({
               title: "Success!",
               text: "Product updated successfully!",
               icon: "success"
            })
            reset() 
        }
    }catch(err){
        Swal.fire({
            title: "error",
            text: "Something is wrong",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          })
          reset()
    }
       
    
  };

  return (
    <div>
      <div>
        <section className="p-6 dark:bg-gray-800 dark:text-gray-50 mx-auto">
          <form
            className="container flex flex-col mx-auto space-bottom-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full">
              <FaUserEdit className="w-[34px] h-[32px] text-cyan-600 mx-auto" />
              <p className="text-center text-xs text-cyan-700">
                update product
              </p>
            </div>
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md  dark:bg-gray-900">
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-4">
                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="productname"
                    className="text-sm text-cyan-800"
                  >
                    Product Name
                  </label>
                  <input
                    id="productname"
                    name="productname"
                    type="text"
                    placeholder="Product Name"
                    defaultValue={productInfo?.productname}
                    className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                    {...register("productname", {
                      required: true,
                      minLength: 5,
                    })}
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
                  <label
                    htmlFor="productlocation"
                    className="text-sm text-cyan-800"
                  >
                    Product Location
                  </label>
                  <input
                    id="productlocation"
                    name="productlocation"
                    type="text"
                    placeholder="Product location"
                    defaultValue={productInfo?.productlocation}
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
                  <label
                    htmlFor="profitmargin"
                    className="text-sm text-cyan-800"
                  >
                    Profit Margin
                  </label>
                  <input
                    id="profitmargin"
                    name="profitmargin"
                    type="number"
                    placeholder="20%"
                    defaultValue={productInfo?.profitmargin}
                    className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                    {...register("profitmargin", {
                      required: true,
                      valueAsNumber: true,
                      min: 1,
                    })}
                  />
                  {errors.profitmargin && (
                    <span className="text-red-700 block mt-2 ml-2">
                      Profit margin is required
                    </span>
                  )}
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="owneremail" className="text-sm text-cyan-800">
                    Product Quantity
                  </label>
                  <input
                    type="number"
                    id="productquantity"
                    name="productquantity"
                    defaultValue={productInfo?.productquantity}
                    placeholder="Product Quantity"
                    className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                    {...register("productquantity", {
                      required: true,
                      valueAsNumber: true,
                      min: 1,
                    })}
                  />
                  {errors.productquantity && (
                    <span className="text-red-700 block mt-2 ml-2">
                      Product quantity required
                    </span>
                  )}
                </div>

                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="description"
                    className="text-sm text-cyan-800"
                  >
                    Production Cost
                  </label>
                  <input
                    id="productioncost"
                    name="productioncost"
                    placeholder="Production Cost"
                    type="number"
                    defaultValue={productInfo?.productioncost}
                    className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                    {...register("productioncost", {
                      required: true,
                      valueAsNumber: true,
                      min: 1,
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
                    defaultValue={productInfo?.discount}
                    className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                    {...register("discount", {
                      required: true,
                      valueAsNumber: true,
                      min: 1,
                    })}
                  />
                  {errors.discount && (
                    <span className="text-red-700 block mt-2 ml-2">
                      Discount is required
                    </span>
                  )}
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
                    defaultValue={productInfo?.productdescription}
                    className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                    {...register("productdescription", {
                      required: true,
                      maxLength: 150,
                    })}
                  />
                  {errors.productdescription && (
                    <span className="text-red-700 block mt-2 ml-2">
                      Product description is required
                    </span>
                  )}
                </div>
              </div>
            </fieldset>

            <button className="px-8 py-3 font-semibold border rounded dark:border-gray-100 w-96 block mx-auto dark:text-gray-100 bg-cyan-700 text-white hover:bg-cyan-800">
              Update Product
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
