import React, { useState } from 'react'
import Sidebar from '../dashboard/Sidebar'
import MyProfile from '../dashboard/MyProfile'
import CreateBloge from '../dashboard/CreateBlog'
import MyBlogs from '../dashboard/MyBlogs'
import UpdateBlog from '../dashboard/UpdateBlog'
import { useAuth } from '../contextAPI/AuthProvider'

export default function Dashboard() {
    const {profile, isAuthenticated} = useAuth();
      // console.log(profile)
    console.log(isAuthenticated)
  const [component,setComponent] = useState("My Blogs");
  return (
    <div>
      <Sidebar component={component} setComponent={setComponent}/>
      {component==='My Profile' ?(<MyProfile/>):component==="Create Blog"?(<CreateBloge/>):component==="Update Blog"?(<UpdateBlog/>):(MyBlogs)}
    </div>
  )
}
