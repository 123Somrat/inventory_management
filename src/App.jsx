import { useState,useEffect} from 'react'

import './App.css'
import Form from './Components/Post/Post'
import User from './Components/User/User'
import DeleteUser from './Components/Delete/DeleteUser'

function App() {
  // fetch post
  const [user, setUser] = useState(0)
      useEffect(()=>{
           fetch("http://localhost:3000/posts")
           .then(res=>res.json())
           .then(data=>setUser(data))
      },[user])

      // delete post
      const deletePost = (_id)=>{
         fetch(`http://localhost:3000/posts/${_id}`,{
          method:"delete"
           
         })
         .then(res=>res.json())
         .then(data=>{
              const newPostList = user.filter(user=>user._id !==_id)
               setUser(newPostList)
         })
         .catch(error=>console.log(error))
         
 }
 // update post


  return (
    <div>
   <div>
         <Form/>
      </div>
      <div>
         <DeleteUser />
      </div>
       <div style={{display:"flex",flexWrap:"wrap",gap:"15px"}}>
       {
         user && user.map((user,id)=><User 
           key={id}
           user={user}
           deletePost={deletePost}
           
          />)
        }
       </div>
        
    </div>
  )
}

export default App
