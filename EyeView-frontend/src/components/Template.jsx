import frameImage from "../assets/frame.png";
import LoginForm from "./LoginForm";
import { FcGoogle } from "react-icons/fc";
 import SignupForm from "./SignupForm";
const Template = ({ title,desc1,decs2,image, formType, setIsLoggedIn }) => {
  return (
    <div className="flex justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12">
      {/* Left Section */}
      <div className="flex flex-col w-1/2 max-w-[450px]">
        <h1 className="text-[#F1F2FF] font-semibold text-[1.875rem] leading-[2.357rem]">
          {title}
        </h1>
        <p className="text-[#AFB2BF] text-[1.125rem] leading-[1.625rem] mt-4">
          <span className="text-[#AFB2BF]">
          {desc1}
          </span>
          <br />
          <span className="text-[#47A5C5] italic">
            {decs2 }
          </span>
        </p>

        {formType === "signup" ? (
          <SignupForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        )}

        {/* OR Divider */}
        <div className="flex w-full items-center my-4 gap-x-2">
          <div className="w-full h-[1px] bg-[#2C333F]"></div>
          <p className="text-[#2C333F]">OR</p>
          <div className="w-full h-[1px] bg-[#2C333F]"></div>
        </div>

        {/* Google Sign Up Button */}
        <button
          className="w-full flex justify-center items-center rounded-[8px] font-medium 
          text-[#AFB2BF] border-[#2C333F] border px-[12px] py-[8px] gap-x-2 mt-6"
        >
          <FcGoogle />
          <p>Sign Up with Google</p>
        </button>
      </div>

      {/* Right Section - Image */}
      <div className="relative w-1/2 max-w-[450px] flex justify-center items-center">
        <img
          src={frameImage}
          alt="Pattern"
          width={558}
          height={504}
          loading="lazy"
          className="absolute -top-[rem]"
        />
        <img
          src={image}
          alt="Students"
          width={558}
          height={504}
          loading="lazy"
          className="absolute -top-1 right-4 "
        />
      </div>
    </div>
  );
};

export default Template;
