import axios from "axios";

export default function useAxiosSecure() {

  const axiosbaseUrl = axios.create({
    baseURL: "http://localhost:5000",
  });

  
  axiosbaseUrl.interceptors.request.use(function (config) {
    // get token from localStorage
       const token = localStorage.getItem("jwt_token");
     
       // set the token in headers
        config.headers.Authorization = `Bearer ${token}`

    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });




  // response interceptor
  axiosbaseUrl.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
   
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });



  return axiosbaseUrl;
}
