import axios from "axios";

export default function useAxios() {
    const axiosPublic = axios.create({
        baseURL: 'http://localhost:3000',
      });
  
      return axiosPublic
}
