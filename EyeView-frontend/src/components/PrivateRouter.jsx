import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
const PrivateRouter = ({isLoggedIn ,children}) => {
   
    if(isLoggedIn){
        return children;
    }
    else{
        return<Navigate to ="/login"/>
    }
  return (
    <div>
      
    </div>
  )
}

export default PrivateRouter
