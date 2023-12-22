import axios from "axios";

export default function useAxios() {
    const axiosPublic = axios.create({
        baseURL: "https://inventory-management-eqz0.onrender.com",
      });
  
      return axiosPublic
}
