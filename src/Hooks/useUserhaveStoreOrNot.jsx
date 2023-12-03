import { useContext,useEffect,useState} from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Providers/Providers";
import { useQuery } from "@tanstack/react-query";


export default function useUserhaveStoreOrNot() {
  const { user } = useContext(AuthContext);
  const axiosbaseUrl = useAxiosSecure();
  const [hasStore,setHasStore] = useState()

   useEffect(()=>{
    axiosbaseUrl
    .get(`/users?email=${user?.email}`)
    .then((res)=>setHasStore(res.data))  
 
   },[user])


return hasStore

}
