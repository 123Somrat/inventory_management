
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Providers/Providers';
import React, { useContext, useState } from 'react'
import ProductSection from '../ProductSection/ProductSection';

export default function SalesCollection() {
   
  return (
    <div>
       <ProductSection/>
    </div>
  )
}
