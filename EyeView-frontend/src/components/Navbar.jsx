import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { motion } from "framer-motion";
import { FiMenu, FiX } from 'react-icons/fi';

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

const Navbar = ({ user, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = ["Home", "Features", "About", "Contact"];

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto"
      >
        <Link to="/">
          <div className="text-white text-3xl font-medium">Eye View</div>
        </Link>

        <nav className="hidden md:block">
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
          {!user && (
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#161D29] text-[#AFB2BF] py-2 px-4 rounded-[8px] border border-[#2C333F] text-lg"
              >
                Login
              </motion.button>
            </Link>
          )}
          {!user && (
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#161D29] text-[#AFB2BF] py-2 px-4 rounded-[8px] border border-[#2C333F] text-lg"
              >
                Sign up
              </motion.button>
            </Link>
          )}
          {user && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                await logout();
                navigate("/");
              }}
              className="bg-[#161D29] text-[#AFB2BF] py-2 px-4 rounded-[8px] border border-[#2C333F] text-lg"
            >
              Logout
            </motion.button>
          )}
          {user && (
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#161D29] text-[#AFB2BF] py-2 px-4 rounded-[8px] border border-[#2C333F] text-lg"
              >
                Dashboard
              </motion.button>
            </Link>
          )}
          <button
            onClick={() => {
              if (user) {
                setSidebarOpen(!sidebarOpen);
              } else {
                setMobileMenuOpen(!mobileMenuOpen);
              }
            }}
            className="md:hidden text-white text-2xl"
          >
            <FiMenu />
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && !user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-(--color-richblack-800) w-full h-full flex flex-col items-center justify-center">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              <FiX />
            </button>
            <ul className="text-[#AFB2BF] text-center space-y-6 text-xl">
              {navLinks.map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
