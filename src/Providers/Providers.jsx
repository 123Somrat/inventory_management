import { createContext } from "react";
import auth from "../FirebaseConfig/FireBaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
// create context
export const AuthContext = createContext();

export default function Providers({ children }) {

// create user 
   const createUser = (user)=>{
      const{username,email,password} = user;
         return createUserWithEmailAndPassword(auth,email, password)
   }




  const User = {
   createUser
  };


  return <AuthContext.Provider value={User}>{children}</AuthContext.Provider>;
}
