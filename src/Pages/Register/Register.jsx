import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Providers/Providers";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

export default function Register() {

  // import createUser method from authContect
 const {createUser} = useContext(AuthContext)
// useing axiosbase instance for sendind data on db
 const axiosPublic = useAxios();
const navigate = useNavigate()


  const { register, handleSubmit,reset,formState: { errors } } = useForm();
  const onSubmit = (data) =>{
  
       createUser(data)
       .then(res=>{
        // show alert after succesfully created user
        Swal.fire({
          title: "Success!",
          text: "user created successfully!",
          icon: "success"
        });
        // gethering user info from firebase response to store user data in users collection 
         const userName = data.username;
         const email =res?.user?.email
         const createdAt  = res?.user?.metadata?.creationTime
         const lastLogin = res?.user?.metadata?.lastSignInTime
         //create user object to send db
         const user = {userName , email , createdAt , lastLogin}
         
         // save user data on database
         axiosPublic.post("/users",user)
         // navigate user to createshop route after register
         .then(data=>{
          navigate("/auth/login" )
         })

       })
       .catch(err=>Swal.fire({
           title : "error",
           text:`${err.message}`,
           icon: "error"
       }))



       // reset form
       reset()
  };




  return (
    <div className="max-w-6xl mx-auto m-8">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100 mx-auto m-8">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Register</h1>
          <p className="text-sm dark:text-gray-400">
            Register in to access our feature
          </p>
        </div>
        <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                UserName
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="mohammad"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:border-cyan-700"
                {...register("username",{required:true,minLength:5})}
              />
              {errors.username && <span className="text-red-700 mt-2 block ml-1">username is required</span>}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:border-cyan-700"
                {...register("email",{required:true,pattern:/.+\@.+\..+/})}
              
              />
              {errors.email && <span className="text-red-700 mt-2 block ml-1">email is required and must follow email pattern</span>}
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:border-cyan-700"
                {...register("password",{required:true,minLength:7})}
              />
              {errors.password && <span className="text-red-700 mt-2 block ml-1">password must be 7 cherecter long</span>}
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900 bg-cyan-600 hover:bg-cyan-800 text-white"
              >
                Register
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-400">
              {" "}
              have an account?
              <Link
                to={"/auth/login"}
                className="hover:underline text-cyan-700 dark:text-violet-400 underline"
              >
                Login
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
