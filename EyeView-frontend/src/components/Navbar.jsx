import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { motion } from "framer-motion";

const navVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const navItem = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.1, duration: 0.4 },
  }),
};

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const navLinks = ["Home", "Features", "About", "Contact"];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto"
    >
      <Link to="/">
        <div className="text-white text-3xl font-medium">Eye View</div>
      </Link>

      <nav>
        <ul className="text-[#AFB2BF] flex gap-x-6">
          {navLinks.map((item, i) => (
            <motion.li
              key={item}
              variants={navItem}
              custom={i}
              initial="hidden"
              animate="visible"
              className="cursor-pointer"
            >
              <Link to={`/${item.toLowerCase()}`}>{item}</Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-x-4">
        {!isLoggedIn && (
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#161D29] text-[#AFB2BF] py-[8px] px-[12px] rounded-[8px] border border-[#2C333F]"
            >
              Login
            </motion.button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#161D29] text-[#AFB2BF] py-[8px] px-[12px] rounded-[8px] border border-[#2C333F]"
            >
              Sign up
            </motion.button>
          </Link>
        )}
        {isLoggedIn && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsLoggedIn(false);
              toast.success("Logged Out");
              navigate("/");
            }}
            className="bg-[#161D29] text-[#AFB2BF] py-[8px] px-[12px] rounded-[8px] border border-[#2C333F]"
          >
            Logout
          </motion.button>
        )}
        {isLoggedIn && (
          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#161D29] text-[#AFB2BF] py-[8px] px-[12px] rounded-[8px] border border-[#2C333F]"
            >
              Dashboard
            </motion.button>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
