import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom"; //  Import Navigate
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PrivateRouter from "./components/PrivateRouter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import History from "./pages/History";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-screen bg-(--color-richblack-900) flex flex-col">
      <Navbar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {user ? (
        <div className="flex relative">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
          <div className="flex-1 p-4 md:ml-0">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/history" element={<History />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/settings" element={<div>Settings Page</div>} />

              {/*  Redirect unknown routes to Dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          


          {/*  Redirect unauthorized users to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
