import React, { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("student"); 

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoggedIn(true);
    toast.success("Account Created");

    console.log("Printing account data:", formData);
    navigate("/dashboard");
  }

  return (
    <div className="w-full max-w-md mx-auto">

      {/* Student-Instructor Toggle */}
      <div className="relative flex bg-[#1E293B] p-1 gap-x-2 my-6 rounded-full w-[250px] mx-auto">
        {/* Sliding Toggle Indicator */}
        <div
          className={`absolute top-1 bottom-1 left-1 w-[50%] bg-[#000814] rounded-full transition-all duration-300 ${
            accountType === "instructor" ? "translate-x-full" : "translate-x-0"
          }`}
        ></div>

        {/* Student Button */}
        <button
          className={`relative flex-1 z-10 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
            accountType === "student" ? "text-white" : "text-[#999DAA]"
          }`}
          onClick={() => setAccountType("student")}
        >
          Student
        </button>

        {/* Instructor Button */}
        <button
          className={`relative flex-1 z-10 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
            accountType === "instructor" ? "text-white" : "text-[#999DAA]"
          }`}
          onClick={() => setAccountType("instructor")}
        >
          Instructor
        </button>
      </div>

      {/* Signup Form */}
      <form onSubmit={submitHandler} className="flex flex-col gap-y-4 mt-6">
        <div className="flex gap-x-4">
          {/* First Name */}
          <label className="w-1/2">
            <p className="text-[#F1F2FF] mb-1">First Name <sup className="text-red-500">*</sup></p>
            <input
              required type="text" name="firstName" onChange={changeHandler} placeholder="Enter First Name"
              value={formData.firstName} className="bg-[#161D29] text-[#F1F2FF] w-full p-3 rounded-md outline-none"
            />
          </label>

          {/* Last Name */}
          <label className="w-1/2">
            <p className="text-[#F1F2FF] mb-1">Last Name <sup className="text-red-500">*</sup></p>
            <input
              required type="text" name="lastName" onChange={changeHandler} placeholder="Enter Last Name"
              value={formData.lastName} className="bg-[#161D29] text-[#F1F2FF] w-full p-3 rounded-md outline-none"
            />
          </label>
        </div>

        {/* Email */}
        <label>
          <p className="text-[#F1F2FF] mb-1">Email Address <sup className="text-red-500">*</sup></p>
          <input
            required type="email" name="email" onChange={changeHandler} placeholder="Enter Email Address"
            value={formData.email} className="bg-[#161D29] text-[#F1F2FF] w-full p-3 rounded-md outline-none"
          />
        </label>

        {/* Password */}
        <label>
          <p className="text-[#F1F2FF] mb-1">Create Password <sup className="text-red-500">*</sup></p>
          <div className="relative">
            <input
              required type={showPassword ? "text" : "password"} name="password" onChange={changeHandler}
              placeholder="Enter Password" value={formData.password}
              className="bg-[#161D29] text-[#F1F2FF] w-full p-3 pr-12 rounded-md outline-none"
            />
            <button
              type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AFB2BF] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye fontSize={20} /> : <FaEyeSlash fontSize={20} />}
            </button>
          </div>
        </label>

        {/* Confirm Password */}
        <label>
          <p className="text-[#F1F2FF] mb-1">Confirm Password <sup className="text-red-500">*</sup></p>
          <div className="relative">
            <input
              required type={showConfirmPassword ? "text" : "password"} name="confirmPassword" onChange={changeHandler}
              placeholder="Confirm Password" value={formData.confirmPassword}
              className="bg-[#161D29] text-[#F1F2FF] w-full p-3 pr-12 rounded-md outline-none"
            />
            <button
              type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AFB2BF] cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaRegEye fontSize={20} /> : <FaEyeSlash fontSize={20} />}
            </button>
          </div>
        </label>

        {/* Submit Button */}
        <button className="bg-[#FFD60A] text-[#000814] rounded-md font-medium py-3">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
