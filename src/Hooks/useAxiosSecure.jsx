import axios from "axios";

export default function useAxiosSecure() {
  const axiosbaseUrl = axios.create({
    baseURL: "http://localhost:3000",
  });

  return axiosbaseUrl;
}
