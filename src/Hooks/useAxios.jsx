import axios from "axios";

export default function useAxios() {
    const axiosPublic = axios.create({
        baseURL: "http://localhost:5000",
      });
  
      return axiosPublic
}
