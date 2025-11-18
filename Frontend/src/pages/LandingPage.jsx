import React from 'react'
import { Link, NavLink } from "react-router-dom"
import Phone from "../assets/Phone.png"
export default function LandingPage() {
  return (
    <div className='h-screen w-full'>
      <div className='object-cover object-center h-screen w-full 
        bg-[url("https://images.unsplash.com/photo-1701014159143-09482059f571?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>

        <div className='w-full h-28 flex justify-between items-center'>

          <h2 className='text-3xl text-[#3EE8FF] pl-5 font-bold'>TalkHub</h2>

          <div className='pr-5 p-7 '>
            <NavLink
              className={"text-2xl text-gray-200 pr-8"}
            >Join as Guest
            </NavLink>

            <NavLink
              className={"text-2xl text-gray-200 pr-8"}
            >Register
            </NavLink>

            <NavLink
              className={"text-2xl px-5 py-2 bg-amber-500 text-white p-2 rounded-2xl "}
            >Login
            </NavLink>
          </div>
        </div>
        <div className='flex '>
          <div className='text w-[35%] pl-5  pt-[15vh]'>

            <h1 className='text-5xl text-white leading-[4.8vw]'>Connect with your <span className='text-amber-500'>Loved Ones</span></h1>
            <p className='text-2xl text-gray-300 pt-5 mb-7'>Cover a distance by TalkHub</p>
            <Link to={"/auth"}
              className='mt-10 bg-amber-500 p-2 text-2xl  rounded-2xl font-medium text-white'>Get Started</Link>
          </div>
          <div className=' pl-[34vw] pt-2'>
            <img src={Phone}
              className="w-[28vw]  h-[80vh] "
              alt="" />
          </div>
        </div>

      </div>
    </div>
  )
}
