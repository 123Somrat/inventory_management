import shopsvg from "../../../public/store-2017.svg";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Providers/Providers";
import Swal from "sweetalert2";

export default function CreateShop() {
  const axiosbase = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const username = user?.email.slice(0, 6);
  const useremail = user?.email;
  // useing useform hook from react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { shopname, shoplogo, shoplocation, description } = data;
    const shoplogopath = shoplogo[0].name
    
    //create shop object
    const shopInfo = {
      username,
      useremail,
      shopname,
      shoplogopath,
      shoplocation,
      description,
    };
    axiosbase
      .post("/createshop", shopInfo)
      .then(res => {
        if (res.data.acknowledged===true) {
          Swal.fire({
            title: "Success!",
            text: "Store created successfully!",
            icon: "success",
          });
        }
        // reset the form
        reset()
      })
      .catch((err) => {
        Swal.fire({
          title: "error!",
          text: "You already have a store",
          icon: "error",
        });
        // reset the form
        reset()
      });
  };

  return (
    <div>
      <section className="p-6 dark:bg-gray-800 dark:text-gray-50 mx-auto">
        <form
          className="container flex flex-col mx-auto space-bottom-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <img src={shopsvg} className="w-16 h-16 mx-auto" />
            <p className="text-center text-xs text-cyan-700">
              Create your shop
            </p>
          </div>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md  dark:bg-gray-900">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-4">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="shopname" className="text-sm text-cyan-800">
                  Shop Name
                </label>
                <input
                  id="shopname"
                  name="shopname"
                  type="text"
                  placeholder="Shop name"
                  className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                  {...register("shopname", { required: true, minLength: 7 })}
                />
                {errors.Shopname && (
                  <span className="text-red-700 block mt-2 ml-2">
                    Shop name is required
                  </span>
                )}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="shoplogo" className="text-sm text-cyan-800">
                  Shop Logo
                </label>
                <input
                  id="shoplogo"
                  name="shoplogo"
                  type="file"
                  placeholder="https://"
                  className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                  {...register("shoplogo", { required: true })}
                />
                {errors.shoplogo && (
                  <span className="text-red-700 block mt-2 ml-2">
                    Shop logo is required
                  </span>
                )}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="shoplocation" className="text-sm text-cyan-800">
                  Shop Location
                </label>
                <input
                  id="shoplocation"
                  name="shoplocation"
                  type="text"
                  placeholder="Shop location"
                  className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                  {...register("shoplocation", { required: true })}
                />
                {errors.shoplocation && (
                  <span className="text-red-700 block mt-2 ml-2">
                    Shop location is required
                  </span>
                )}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="ownername" className="text-sm text-cyan-800">
                  Shop Owner Name
                </label>
                <input
                  id="ownername"
                  name="ownername"
                  type="text"
                  placeholder="Owne name"
                  className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                  defaultValue={username}
                  disabled
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="owneremail" className="text-sm text-cyan-800">
                  Shop Owner Email
                </label>
                <input
                  id="owneremail"
                  name="owneremail"
                  type="text"
                  placeholder="Owner email"
                  className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                  defaultValue={useremail}
                  disabled
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="description" className="text-sm text-cyan-800">
                  Shop Info
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder=""
                  className="w-full rounded-md focus:border-cyan-800 dark:border-gray-700 dark:text-gray-900"
                  {...register("description", {
                    required: true,
                    maxLength: 150,
                  })}
                ></textarea>
                {errors.bio && (
                  <span className="text-red-700 block mt-2 ml-2">
                    Shop description is required
                  </span>
                )}
              </div>
            </div>
          </fieldset>

          <button className="px-8 py-3 font-semibold border rounded dark:border-gray-100 w-96 block mx-auto dark:text-gray-100 bg-cyan-700 text-white hover:bg-cyan-800">
            Create Shop
          </button>
        </form>
      </section>
    </div>
  );
}
