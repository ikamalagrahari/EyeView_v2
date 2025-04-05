import React from 'react'
import signupImg from "../assets/signup.png" 
import Template from '../components/Template'
const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
    title ="Join  the millons learning to code with StudyNotion for free"
    desc1="Build skill for today, tomorrow, and beyond. "
    decs2 ="Education to future-proof your career"
    image={signupImg}
    formType="signup"
    setIsLoggedIn={setIsLoggedIn}
    
    />
  )
}

export default Signup
