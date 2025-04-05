import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // ✅ Import Navigate
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import History from "./pages/History";
import PrivateRouter from "./components/PrivateRouter";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-screen bg-[var(--color-richblack-900)] flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {isLoggedIn ? (
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<div>Settings Page</div>} />

              {/* ✅ Redirect unknown routes to Dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />

          {/*  Redirect unauthorized users to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
