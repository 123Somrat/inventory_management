import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  return (
    <div className="max-w-6xl mx-auto m-8">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100 mx-auto m-8">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Register</h1>
          <p className="text-sm dark:text-gray-400">
            Register in to access our feature
          </p>
        </div>
        <form className="space-y-12">
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
              />
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
              />
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
              />
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
                to={"/login"}
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
