import { createContext, useEffect, useState } from "react";
import auth from "../FirebaseConfig/FireBaseConfig";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut , onAuthStateChanged , GoogleAuthProvider , signInWithPopup} from "firebase/auth";
import Swal from "sweetalert2";
import useAxios from "../Hooks/useAxios";
// create context
export const AuthContext = createContext();

export default function Providers({ children }) {
 const [user,setUser] = useState(null)
 const axiosPublic = useAxios()

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

// loginUser with goggle

const loginUserWithGoggle = () =>{
   // import GoogleAuthProvider from firebase
   const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider)

}





// observer user status
useEffect(()=>{
  const unSubscribe =  onAuthStateChanged(auth, async(user) => {
      if (user) {
          const userData ={ email : user?.email}

          // request for jwt token
          const token =await axiosPublic.post("/generatejwttoken",userData);
         
          if(token?.data?.jwtToken){
            // set jwt token in local storage
               const jwtToken = localStorage.setItem("jwt_token",token?.data?.jwtToken)
          }
         setUser(user) 
       
      } else {
         // remove jwt token when user logout 
           localStorage.removeItem("jwt_token")
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
   loginUserWithGoggle,
   user
  };


  return <AuthContext.Provider value={User}>{children}</AuthContext.Provider>;
}
