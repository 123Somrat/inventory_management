import React, { useContext, useState } from 'react'
import useAxiosSecure from './useAxiosSecure'
import { AuthContext } from '../Providers/Providers'

export default function  useProductCount() {
    const axiosbase = useAxiosSecure()
    const [count,setCount] = useState(0)
    const {user} = useContext(AuthContext)
    axiosbase.get(`/productcount?email=${user?.email}`)
    .then(res=>setCount(res.data))

  return count
}
