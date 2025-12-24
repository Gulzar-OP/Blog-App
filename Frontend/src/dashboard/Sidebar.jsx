import React from 'react'
import { useAuth } from '../contextAPI/AuthProvider';
import {useNavigate} from 'react-router-dom'

export default function Sidebar(setComponent) {
    const {profile, isAuthenticated} = useAuth();
    // console.log(profile)
    console.log(isAuthenticated)
    const handleComponent=(value)=>{
      setComponent(value)
    }
    const navigate = useNavigate();
    const gotoHome=()=>{

    }
  return (
    <div>
      <div>
          <img src={profile.photo?.url} alt="" />
          <p>{profile.name}</p>
      </div>
      <ul>
        <button onClick={()=>handleComponent('My Blogs')} className='w-full px-4 py-2 bg-green-500 rouned-lg hover:bg-green-700 transition duration-300'>MY BLOGS</button>
        <button onClick={()=>handleComponent('Create Blog')} className='w-full px-4 py-2 bg-green-500 rouned-lg hover:bg-green-700 transition duration-300'>CREATE BLOGS</button>
        <button onClick={()=>handleComponent('My Profile')} className='w-full px-4 py-2 bg-green-500 rouned-lg hover:bg-green-700 transition duration-300'>MY PROFILE</button>
        <button onClick={gotoHome} className='w-full px-4 py-2 bg-green-500 rouned-lg hover:bg-green-700 transition duration-300'>HOME</button>
        <button onClick={()=>handleComponent('')} className='w-full px-4 py-2 bg-green-500 rouned-lg hover:bg-green-700 transition duration-300'>LOGOUT</button>
      </ul>
    </div>
  )
}
