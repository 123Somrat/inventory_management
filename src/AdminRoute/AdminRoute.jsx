import React, { useContext } from 'react'
import { AuthContext } from '../Providers/Providers'
import { useNavigate } from 'react-router-dom';

export default function AdminRoute({children}) {
  const {user,logOut}= useContext(AuthContext);
 const navigate = useNavigate()
  if(user && user?.email==="mdjafaruddin738@gmail.com"){
     return children
  }else{
        logOut() 
        
        return navigate("/auth/login")
  }


}
