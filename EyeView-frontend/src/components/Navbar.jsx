import React, { lazy } from 'react'
import logo from "../assets/Logo.svg"
import {Link, Navigate} from "react-router-dom"
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom"



const  Navbar = (props) => {
 let isLoggedIn = props.isLoggedIn;
 let setIsLoggedIn = props.setIsLoggedIn;
 const Navigate = useNavigate();
  return (
    <div className='flex justify-between item-center w-11/12 max-w-[1160px] py-4 mx-auto'>
      <Link to ="/">
      <div className='text-white text-3xl font-medium '>Eye View</div>
      </Link>
      <nav >
        <ul className='text-[#AFB2BF] flex gap-x-6'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">About</Link></li>
        <li><Link to="/">Contact</Link></li>
        </ul>
      </nav>
        
        <div className="flex items-center gap-x-4 ">
          {!isLoggedIn &&
            <Link to="/login">
              <button className = " bg-[#161D29] text-[#AFB2BF] py-[8px] px-[12px] rounded-[8px] border border-[#2C333F]">
                Login
              </button>            
             </Link>
          }
          { !isLoggedIn &&
            <Link to="/signup">
              <button className = "bg-[#161D29] text-[#AFB2BF] py-[8px] px-[12px] rounded-[8px] border border-[#2C333F]">
                Sign up
              </button>            
             </Link>
          }
          {isLoggedIn &&
            <Link to="/logout">
              <button onClick={()=>{
                setIsLoggedIn(false);
                toast.success("Logged Out")
                Navigate("/");
              }}className = "bg-[#161D29] text-[#AFB2BF] py-[8px] px-[12px] rounded-[8px] border border-[#2C333F]">
               Logout
              </button>            
             </Link>
          }
          { isLoggedIn &&
            <Link to="/Dashboard">
              <button className = "bg-[#161D29] text-[#AFB2BF] py-[8px] px-[12px] rounded-[8px] border border-[#2C333F]">
                Dashboard
               </button>            
             </Link>
          }
        </div>
    </div>
  )
}

export default Navbar;
