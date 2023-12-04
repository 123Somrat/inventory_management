import React, { useContext } from 'react'
import { AuthContext } from '../Providers/Providers'
import { Navigate, useNavigate } from 'react-router-dom'

export default function PrivateRoute({children}) {
  const {user} = useContext(AuthContext)
   const navigate = useNavigate()
   
  if(user?.email){
    return children
  }
  else {
     return <Navigate to="/auth/login" />
  }


}
