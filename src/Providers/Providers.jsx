import { createContext, useEffect, useState } from "react";
import auth from "../FirebaseConfig/FireBaseConfig";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut , onAuthStateChanged} from "firebase/auth";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import useUserhaveStoreOrNot from "../Hooks/useUserhaveStoreOrNot";
// create context
export const AuthContext = createContext();

export default function Providers({ children }) {
 const [user,setUser] = useState(null)


// create user 
   const createUser = (user)=>{
      const{username,email,password} = user;
         return createUserWithEmailAndPassword(auth,email, password)
   }
// login user
const loginUser = (email,password) =>{
    
   // useing utils methhods from firebase
   return signInWithEmailAndPassword(auth, email, password)
}

// observer user status
useEffect(()=>{
  const unSubscribe =  onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
       
      } else {
        // User is signed out
        // ...
      }
    });

   return ()=>{
      unSubscribe()
   }


},[])





// signout user

const logOut = () =>{
   signOut(auth)
   .then(()=>{
      Swal.fire({
         title: "Success!",
         text: "Signout successfully!",
         icon: "success"
       });
       
       setUser(null)
    
      
   })
   .catch(err=>{
      Swal.fire({
         title: "error!",
         text: `${err.message}`,
         icon: "error"
       });

   })
}



  const User = {
   createUser,
   loginUser,
   logOut,
   user
  };


  return <AuthContext.Provider value={User}>{children}</AuthContext.Provider>;
}
