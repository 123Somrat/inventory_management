import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/Providers";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useUserhaveStoreOrNot from "../../Hooks/useUserhaveStoreOrNot";
export default function Login() {
 const navigate = useNavigate()
   const hasStore = useUserhaveStoreOrNot();


  // useing login user method from authcontext
  const {loginUser} = useContext(AuthContext)

 // useing useForm hook from react hook form
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = data => {
       const {email,password}= data
       loginUser(email,password)

       // todo : have to navigate dasjboard
       .then(res=>{
        Swal.fire({
          title: "Success!",
          text: "User login successfully!",
          icon: "success"
        });
        // checking useing has store or not
       Array.isArray(hasStore) ?navigate("/createshop") : navigate("/dashboard")
      }).catch(err=>{
        Swal.fire({
          title: "error!",
          text: `${err.message}`,
          icon: "error"
        });


      })


  };
  return (
    <div className="max-w-6xl mx-auto flex justify-center items-center m-12">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block dark:text-gray-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:border-cyan-700"
              {...register("email",{required:true})}
            />
          {errors.email && <span className="text-red-700 mt-2 block ml-1">email is required</span>}
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block dark:text-gray-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:border-cyan-700"
              {...register("password",{required:true})}
            />
             {errors.password && <span className="text-red-700 mt-2 block ml-1">password required</span>}
            <div className="flex justify-end text-xs dark:text-gray-400">
              <a rel="noopener noreferrer" href="#">
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="block w-full p-3 text-center rounded-sm dark:text-gray-900 dark:bg-cyan-400 bg-cyan-600 hover:bg-cyan-800 text-white"
          >
            Log in
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button aria-label="Log in with Google" className="p-3 rounded-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
        </div>
        <p className="text-xs text-center sm:px-6 dark:text-gray-400">
          Don't have an account?
          <Link
            to={"/auth/register"}
            className="underline dark:text-gray-100 text-cyan-700"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
