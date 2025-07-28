

import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaDollarSign,
  FaChartLine,
  FaTimesCircle,
} from "react-icons/fa";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import "chart.js/auto";

import { MdLocalShipping, MdOutlineCancel, MdCheckCircle } from "react-icons/md";
import { FaChartBar, FaClipboardList } from "react-icons/fa";

import { BsGlobe } from "react-icons/bs";
import { PiCoffeeFill } from "react-icons/pi";
import { MdFastfood } from "react-icons/md";



const recentOrders = [
  {
    id: "ORD1025",
    image: "/1.avif",
    menu: "Salmon Sushi Roll",
    category: "Seafood",
    qty: 3,
    amount: "$30.00",
    customer: "Dana White",
    status: "On Process",
  },
  {
    id: "ORD1026",
    image: "/2.avif",
    menu: "Spaghetti Carbonara",
    category: "Pasta",
    qty: 1,
    amount: "$15.00",
    customer: "Eve Carter",
    status: "Cancelled",
  },
  {
    id: "ORD1027",
    image: "/3.avif",
    menu: "Classic Cheeseburger",
    category: "Burger",
    qty: 1,
    amount: "$10.00",
    customer: "Charlie Brown",
    status: "Completed",
  },
];

const reviews = [
  {
    id: "rev001",
    title: "Classic Italian Penne",
    desc:
      "This pasta is absolutely delicious!.",
    name: "Sarah M.",
    date: "Oct 12, 2035",
    stars: 5,
    image: "/2.avif",
  },
  {
    id: "rev002",
    title: "Smokey Supreme Pizza",
    desc:
      "Crispy crust with a smoky flavor that hits just right. ",
    name: "Michael R.",
    date: "Oct 15, 2035",
    stars: 4.5,
    image: "/4.avif",
  },
  {
    id: "rev003",
    title: "Herb Garlic Breadsticks",
    desc:
      "Warm, buttery, and loaded with garlic and herbs. They were soft. ",
    name: "Linda T.",
    date: "Oct 17, 2035",
    stars: 4,
    image: "/3.avif",
  },
 
];


const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const filterByDate = () => true; // Placeholder — you can enhance it if you add actual date fields

    const filtered = recentOrders.filter((order) => {
      return (
        (order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.menu.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id.toString().includes(searchTerm)) &&
        filterByDate(order.date)
      );
    });

    setFilteredOrders(filtered);
  }, [searchTerm, filter]);

  const summaryData = [
    { title: "Total Orders", value: "48,652", icon: <FaChartLine />, change: "1.58%" },
    { title: "Total Customer", value: "1248", icon: <FaUsers />, change: "0.42%" },
    { title: "Total Revenue", value: "$215,860", icon: <FaDollarSign />, change: "2.36%" },
    { title: "Cancelled Orders", value: "37", icon: <FaTimesCircle />, change: "-0.8%" },
  ];

const doughnutData = {
  labels: ["Seafood", "Beverages", "Dessert", "Pasta"],
  datasets: [
    {
      data: [30, 25, 25, 20],
      backgroundColor: ["#FF7F50", "#FDB45C", "#46BFBD", "#F7464A"],
      borderWidth: 0,
    },
  ],
};

  const lineData = {
    labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Income",
        data: [10000, 12000, 9500, 14000, 16580, 13000, 18000, 19500],
        borderColor: "#FF7F50",
        backgroundColor: "transparent",
        tension: 0.4,
      },
      {
        label: "Expense",
        data: [6000, 8000, 7000, 10000, 8200, 9500, 9000, 9700],
        borderColor: "#000",
        backgroundColor: "transparent",
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Orders",
        data: [120, 130, 140, 185, 150, 145, 135],
        backgroundColor: [
          "#FFE5D9", "#FFE5D9", "#FFE5D9", "#FF7F50", "#FFE5D9", "#FFE5D9", "#FFE5D9",
        ],
      },
    ],
  };

const orderTypes = [
  { type: "Delivered", count: 120, percent: 75 },
  { type: "Cancelled", count: 15, percent: 10 },
  { type: "Shipping", count: 20, percent: 12 },
  { type: "Online", count: 5, percent: 3 },
];

  return (
    <div className="px-0 py-7 space-y-3 min-h-screen">
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
        {summaryData.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl shadow p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 text-white w-12 h-12 rounded-md flex items-center justify-center text-xl">
                {card.icon}
              </div>
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <h2 className="text-2xl font-bold">{card.value}</h2>
              </div>
            </div>
            <p className="text-green-500 text-xs sm:text-sm">↑ {card.change}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 py-8 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Total Revenue</h2>
          <Line data={lineData} />
        </div>
    <div className="bg-white rounded-2xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Top Categories</h2>

      {/* Doughnut Chart */}
      <Doughnut data={doughnutData} />

      {/* Category Details */}
      <div className="mt-6 space-y-3">
        {doughnutData.labels.map((label, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: doughnutData.datasets[0].backgroundColor[idx] }}
              ></span>
              <span className="font-medium">{label}</span>
            </div>
            <span className="text-gray-500">
              {doughnutData.datasets[0].data[idx]} %
            </span>
          </div>
        ))}
      </div>
    </div>
      </div>

      {/* Orders & Order Types */}
      <div className="grid grid-cols-1 py-5 md:grid-cols-2 gap-4">
        {/* Orders Overview */}
        <div className="bg-white rounded-2xl shadow p-5">
          <div className="flex items-center gap-2 mb-4">
            {/* <FaChartBar className="text-orange-500 text-xl" /> */}
            <h2 className="text-lg font-semibold">Orders Overview</h2>
          </div>
          <Bar data={barData} />
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
      <div className="flex items-center gap-2 mb-10">
        <h2 className="text-lg font-semibold">Order Types</h2>
      </div>

      {orderTypes.map((type, idx) => {
        let Icon;

        const lowerType = type.type.toLowerCase();

        if (lowerType.includes("delivered")) {
          Icon = PiCoffeeFill;
        } else if (lowerType.includes("cancelled")) {
          Icon = MdFastfood;
        } else if (lowerType.includes("shipping")) {
          Icon = MdLocalShipping;
        } else if (lowerType.includes("online")) {
          Icon = BsGlobe;
        } else {
          Icon = FaClipboardList;
        }

        return (
          <div key={idx} className="mb-10">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 bg-LightOrange p-3 rounded-full text-white">
                <Icon className="text-lg" />
              </div>

              {/* Type and progress bar */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">{type.type}  { type.percent }%</p>
                  <p className="text-xs text-gray-500">{type.count} orders</p>
                </div>
                <div className="w-full bg-gray-200 h-4 rounded-full">
                  <div
                    className="h-4 rounded-full bg-black"
                    style={{ width: `${type.percent}%` }}
                  ></div>
                  
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
      </div>


      {/* Recent Orders */}
      <div className="bg-white rounded-2xl mt-8 shadow p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by customer, menu, or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-64"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-[640px] w-full text-sm">
            <thead className="bg-bgcolor">
              <tr className="text-left">
                <th className="py-3 px-1">Order ID</th>
                <th className="py-3 px-1">Photo</th>
                <th className="py-3 px-1">Menu</th>
                <th className="py-3 px-1">Qty</th>
                <th className="py-3 px-1">Amount</th>
                <th className="py-3 px-1">Customer</th>
                <th className="py-3 px-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, i) => (
                  <tr key={i}>
                    <td className="py-3 px-1">{order.id}</td>
                    <td className="py-3 px-1"><img className="bg-gray p-2 rounded-lg object-contain w-17 h-17" src={order.image} alt="" /></td>
                    <td className="py-3 px-1">
                      {order.menu}{" "}
                      <span className="text-gray-400 text-xs">({order.category})</span>
                    </td>
                    <td className="py-3 px-1">{order.qty}</td>
                    <td className="py-3 px-1">{order.amount}</td>
                    <td className="py-3 px-1">{order.customer}</td>
                    <td className="py-3 px-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs text-white ${order.status === "Completed"
                          ? "bg-green-500"
                          : order.status === "Cancelled"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="py-8">
        <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl shadow">
              <div className="grid grid-cols-2 gap-2">
                {/* Left Column */}
                <div>
                  <p className="font-semibold text-orange-500 mb-1">{review.title}</p>
                  <p className="text-sm text-gray-700">{review.desc}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {review.name} - {review.date}
                  </p>

                  <p className="text-yellow-500 text-lg">⭐ {review.stars}</p>
                </div>

                {/* Right Column */}
                <div className="flex items-center justify-center">
                  <div className=" mb-2"><img className="bg-textcolor w-40 h-40 p-2 rounded-xl" src={review.image} alt="" /></div>

                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



