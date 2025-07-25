import React, { useEffect, useState, useRef } from "react";
import {
  FaBars,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";


import logo from "/adminlogo.png";
import Dashboard from "./Admin/Dashboard";
import Sidebar from "./Admin/Sidebar";
import Allorder from "./Admin/Orders/Allorder";
import AllMenus from "./Admin/Menus/AllMenus";
import OrderDetails from "./Admin/Orders/OrdersDetails";
import MenuDetails from "./Admin/Menus/MenuDetails";
import AddMenu from "./Admin/Menus/AddMenuItems";
import CancelOrders from "./Admin/Orders/CanceledOrders";
import Deliverys from "./Admin/Orders/Delivery";
import Review from "./Admin/Reviews/Reviews";


const adminName = "Admin";
const adminImage = "/default-profile.png";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const profileRef = useRef();
  const sidebarRef = useRef(null);

  const location = useLocation();


  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/allOrders")) setActiveTab("All Orders");
    else if (path.includes("/allmenus")) setActiveTab("All Menus");
    else if (path.includes("/addmenus")) setActiveTab("Add New Menus");
    else if (path.includes("/deliveryOrder")) setActiveTab("Delivered Orders");
    else if (path.includes("/cancleOrders")) setActiveTab("Cancelled Orders");
    else if (path.includes("/reviews")) setActiveTab("Reviews");
    else if (path.includes("/dashboard")) setActiveTab("Dashboard");
    else setActiveTab("Admin Panel");
  }, [location]);

  

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target) &&
        (!sidebarRef.current || !sidebarRef.current.contains(e.target))
      ) {
        setProfileDropdownOpen(false);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-bodycolor">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 bg-white w-64 h-screen text-white transition-transform duration-300 ease-in-out ${mobileMenu ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div className="flex items-center justify-between px-4 ">
          <img src={logo} alt="Admin Logo" className="h-20 w-auto object-contain" />
          <button
            className="md:hidden text-textcolor text-2xl"
            onClick={() => setMobileMenu(false)}
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>
        <Sidebar setActiveTab={setActiveTab} />
      </aside>

      {/* Main Layout */}
      <div className="flex-1 md:ml-64 w-full min-h-screen flex flex-col">
        {/* Header */}
        <header className="fixed top-0 left-0 md:left-64 right-0 z-40 bg-bodycolor text-textcolor flex items-center justify-between px-4 h-20  py-3">
          {/* Left */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="md:hidden text-2xl" onClick={() => setMobileMenu(true)}>
              <FaBars />
            </button>
            <div className="  flex-col">
              <h1 className="font-bold text-lg text-gray whitespace-nowrap capitalize">{activeTab}</h1>
            <p className=" text-[13px]">Hello, Dhivakar Welcome back</p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 md:gap-6 ml-auto relative" ref={profileRef}>
            {/* Search */}
            <div className="relative hidden md:block">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 rounded-md text-sm text-black bg-white focus:outline-none shadow"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="relative w-10 h-10 bg-white text-textcolor rounded-lg flex items-center justify-center shadow"
              >
                <FaBell className="text-xl" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>
              {open && (
                <div className="absolute right-[-60px] top-14 w-[90vw] max-w-xs sm:max-w-sm bg-white shadow-xl rounded-lg z-50 border">
                  <ul className="divide-y max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <li className="p-4 text-gray-500 text-sm text-center">
                        No new orders today
                      </li>
                    ) : (
                      notifications.map((order) => (
                        <li
                          key={order.orderID}
                          onClick={() => {
                            setActiveTab("allOrders");
                            setOpen(false);
                          }}
                          className="flex gap-3 p-4 hover:bg-gray-50 transition cursor-pointer"
                        >
                          <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                            📦
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate">
                              {order.checkout?.fullname}
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                              Placed an order - #{order.orderID}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{order.time}</p>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Profile Button */}
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="w-10 h-10 bg-white text-textcolor rounded-lg flex items-center justify-center shadow"
            >
              <span className="font-bold">{adminName.charAt(0)}</span>
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-2 top-14 w-64 bg-white text-black shadow-md rounded-lg z-50">
                <div className="flex items-center px-4 py-3 border-b border-orange-500 gap-3">
                 
                  <div>
                    <p className="font-semibold">{adminName}</p>
                    
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTab("profile");
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-100 text-gray hover:text-black flex items-center gap-2"
                >
                  <FaUserCircle className="text-textcolor " />
                  My Profile
                </button>

                <button className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 hover:text-red-800 flex items-center gap-2">
                  <FaSignOutAlt className="text-red-600" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-bodycolor mt-20 px-4 md:px-6 py-6 overflow-y-auto">
          <Routes>
            <Route path="/dashboard"  element={<Dashboard />} />
            <Route path="/allOrders" element={<Allorder />} />
            <Route path="/order/:id" element={<OrderDetails />} />

            <Route path="/deliveryOrder" element={<Deliverys />} />
            <Route path="/cancleOrders" element={<CancelOrders />} />

            <Route path="/allmenus" element={<AllMenus />} />
            <Route path="/menu/:id" element={<MenuDetails />} />
            <Route path="/addmenus" element={<AddMenu />} />
            <Route path="/addmenus/:id" element={<AddMenu />} />
            <Route path="/reviews" element={<Review/>} />
           
            
            
            <Route path="*" element={<h2 className="text-red-500">Page not found</h2>} />
          </Routes>

          <footer className="text-textcolor text-sm py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div>
                © {new Date().getFullYear()} <strong>Food Orders Admin Panel</strong>. All rights reserved. |
                Built by{" "}
                <a
                  href=""
                  target=""
                  rel="noopener noreferrer"
                  className="underline hover:text-yellow-400"
                >
                  YourCompany
                </a>
              </div>
              <div className="flex gap-4 text-lg justify-center md:justify-end">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gray">
                  <FaFacebookF />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gray">
                  <FaInstagram />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-gray">
                  <FaTwitter />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-gray">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
