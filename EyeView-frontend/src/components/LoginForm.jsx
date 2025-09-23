import React, { useState } from 'react'
import { FaEyeSlash, FaRegEye  } from "react-icons/fa";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { useAuth } from '../context/AuthContext';

function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData,setFormData] =useState({
        email:"",password:""
    })

    const[showPassword, setShowPassword] =useState(false);
    function changeHandler(event){
        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )
    }
    async function submitHandler(event){
        event.preventDefault();
        try {
            await login(formData.email, formData.password);
            navigate("/dashboard");
        } catch (error) {
            // Error is handled in the auth context with toast
        }
    }
  return (
  <form onSubmit ={submitHandler} className='flex flex-col w-full gap-y-4 mt-6' >
   <label htmlFor="Logged In" className='w-full relative '>
       <p className=' text-[0.875rem] text-[#F1F2FF] mb-1 leading-5.5'>
           Email Address <sup className='text-red-500'>*</sup>
       </p>
       <input required type="email" value={formData.email} onChange={changeHandler}  
       placeholder='Enter email id' name ="email" className='bg-[#161D29] rounded-lg text-[#F1F2FF] w-full p-[12px]'/>
       
   </label>
   <label className="relative w-full">
 <p className="text-[0.875rem] text-[#F1F2FF] mb-1 leading-5.5">
   Password <sup className="text-red-500">*</sup>
 </p>

 {/* Input Field with Wrapper */}
 <div className="relative w-full">
   <input
     required
     type={showPassword ? "text" : "password"}
     value={formData.password}
     onChange={changeHandler}
     placeholder="Enter Password"
     name="password"
     className="bg-[#161D29] rounded-lg text-[#F1F2FF] w-full p-[12px] pr-10"
   />

   {/* Eye Icon */}
   <span
     className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-2"
     onClick={() => setShowPassword((prev) => !prev)}
   >
     {showPassword ? (
       <FaRegEye fontSize={24} fill="#AFB2BF" />
     ) : (
       <FaEyeSlash fontSize={24} fill="#AFB2BF" />
     )}
   </span>
 </div>

 {/* Forgot Password Link */}
 <Link to="#">
   <p className="text-xs mt-1 max-w-max ml-auto text-[#47A5C5]">
     Forgot Password?
   </p>
 </Link>
</label>


   <button className='bg-[#2db8e6] text-[#000814] rounded-[8px] font-medium px-4 py-3 text-lg'>Sign In</button>
  </form>
  )
}

export default LoginForm

      