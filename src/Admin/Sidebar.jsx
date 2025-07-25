import React, { useState } from "react";
import {
  FaHome,
  FaListAlt,
  FaHamburger,
  FaBoxOpen,
  FaUsers,
  FaUtensils,
  FaMotorcycle,
  FaTags,
  FaStar,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaFileInvoice,
  FaUserShield,
  FaFileExport,
  FaHeadset,
  FaLock,
} from "react-icons/fa";
import { NavLink,Link } from "react-router-dom";

const SidebarSection = ({ title, icon, items }) => {
  const [open, setOpen] = useState(false);

 

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center w-full p-3 rounded hover:bg-bgcolor transition duration-300"
      >
        <span className="text-lg mr-3">{icon}</span>
        <span className="flex-1 text-left">{title}</span>
        <span>{open ? <FaChevronUp /> : <FaChevronDown />}</span>
      </button>

      {open && (
        <ul className="pl-10 text-sm space-y-2 mt-2">
          {items.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block p-2 rounded transition font-bold duration-200 ${
                    isActive
                      ? "bg-bgcolor text-textcolor font-bold"
                      : "text-textcolor hover:bg-bgcolor hover:text-textcolor"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Sidebar = ({ setActiveTab }) => {
  
  return (
    <aside className="bg-white text-textcolor w-64 min-h-screen pb-[40%] h-[100vh] overflow-y-auto p-4 ">

      <nav className="space-y-3">
        <NavLink 
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded hover:bg-bgcolor transition ${
              isActive ? "bg-bgcolor" : ""
            }`
          }
          
        >
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <SidebarSection
          title="Orders"
          icon={<FaListAlt />}
          items={[
            { name: "All Orders", path:"/allOrders" },
            { name: "Delivered", path:"/deliveryOrder" },
            { name: "Cancelled", path:"/cancleOrders" },
          ]}
        />

        <SidebarSection
          title="Menu List"
          icon={<FaHamburger />}
          items={[
            { name: "All Menus", path: "/allmenus" },
            { name: "Add New Menus", path: "/addmenus" },
            
          ]}
        />

       
        <NavLink 
          to="/reviews"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded hover:bg-bgcolor transition ${
              isActive ? "bg-bgcolor" : ""
            }`
          }
          
        >
          <FaStar />
          <span>Reviews</span>
        </NavLink>

        

  

        <NavLink
          to=""
          className="flex items-center gap-3 p-3  text-textcolor rounded hover:bg-bgcolor hover:text-textcolor "
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
