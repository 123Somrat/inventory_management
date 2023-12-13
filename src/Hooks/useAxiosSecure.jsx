import axios from "axios";

export default function useAxiosSecure() {
  const axiosbaseUrl = axios.create({
    baseURL: "http://localhost:5000",
  });

  axios.interceptors.response.use(function (response) {
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
