import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { RiBillLine } from "react-icons/ri";
import { LuCircleDashed } from "react-icons/lu";
import { SiTicktick } from "react-icons/si";
import { TbMessageCancel } from "react-icons/tb";
import { useNavigate } from "react-router-dom"; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AllOrder = () => {

  const navigate = useNavigate();

  const summaryData = [
    {
      title: "Total Orders",
      value: 200,
      icon: <RiBillLine className=" text-orange h-7" />,
    },
    {
      title: "On Process",
      value: 45,
      icon: <LuCircleDashed className=" text-orange h-7" />,
    },
    {
      title: "Completed",
      value: 140,
      icon: <SiTicktick className=" text-orange h-7" />,
    },
    {
      title: "Canceled",
      value: 15,
      icon: <TbMessageCancel className=" text-orange h-7" />,
    },
  ];

  const lineChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Orders",
        data: [220, 270, 250, 301, 280, 310, 360],
        fill: true,
        backgroundColor: "rgba(255,106,0,0.1)",
        borderColor: "#ff6a00",
        tension: 0.4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#ff6a00",
        pointHoverRadius: 6,
        pointRadius: 3,
      },
    ],
  };

  const doughnutData = {
    labels: ["Dine In", "Takeaway", "Online"],
    datasets: [
      {
        label: "Order Types",
        data: [75, 60, 65],
        backgroundColor: ["#ff6a00", "#fbc275", "#1f2937"],
        cutout: "70%",
      },
    ],
  };

  const orderData = [
    {
      id: "ORD1023",
      date: "2035-10-20 02:47 PM",
      customer: "Alice Johnson",
      type: "Dine-In",
      address: "-",
      qty: 1,
      amount: "$18.00",
      status: "Completed",
    },
    {
      id: "ORD1024",
      date: "2035-10-26 12:47 AM",
      customer: "Bob Smith",
      type: "Takeaway",
      address: "-",
      qty: 2,
      amount: "$24.00",
      status: "Cancelled",
    },
    {
      id: "ORD1025",
      date: "2035-10-23 10:47 PM",
      customer: "Charlie Brown",
      type: "Dine-In",
      address: "-",
      qty: 1,
      amount: "$10.00",
      status: "Completed",
    },
    {
      id: "ORD1026",
      date: "2035-10-23 01:47 PM",
      customer: "Dana White",
      type: "Dine-In",
      address: "-",
      qty: 3,
      amount: "$30.00",
      status: "On Process",
    },
    {
      id: "ORD1027",
      date: "2035-10-26 03:47 PM",
      customer: "Eve Carter",
      type: "Online",
      address: "123 Elm Street",
      qty: 1,
      amount: "$15.00",
      status: "Completed",
    },
    {
      id: "ORD1028",
      date: "2035-10-22 11:47 AM",
      customer: "Frank Miller",
      type: "Online",
      address: "456 Pine Avenue",
      qty: 4,
      amount: "$35.00",
      status: "Completed",
    },
    {
      id: "ORD1029",
      date: "2035-10-27 09:47 AM",
      customer: "Grace Lee",
      type: "Takeaway",
      address: "-",
      qty: 2,
      amount: "$22.00",
      status: "Cancelled",
    },
    {
      id: "ORD1030",
      date: "2035-10-26 08:47 AM",
      customer: "Hannah Gold",
      type: "Dine-In",
      address: "-",
      qty: 3,
      amount: "$36.00",
      status: "On Process",
    },
    {
      id: "ORD1031",
      date: "2035-10-21 05:47 PM",
      customer: "Ivan Tucker",
      type: "Online",
      address: "789 Oak Lane",
      qty: 5,
      amount: "$60.00",
      status: "Completed",
    },
    {
      id: "ORD1032",
      date: "2035-10-25 02:47 PM",
      customer: "Jessica Fox",
      type: "Online",
      address: "321 Maple Road",
      qty: 2,
      amount: "$25.00",
      status: "On Process",
    },
  ];

const statusColor = {
  Completed: "bg-[#ff6a00]/90 text-white",
  "On Process": "bg-[#fbc275]/70 text-[#9a5c00]",
  Canceled: "bg-[#1f2937] text-white",
};

const orderTypeColor = {
  "Dine-In": "text-[#ff6a00] bg-[#ff6a00]/10",
  Takeaway: "text-[#fbc275] bg-[#fbc275]/20",
  Online: "text-[#1f2937] bg-[#1f2937]/10",
};;

   const [selectedTab, setSelectedTab] = useState("All");
  const tabs = ["All", "On Process", "Completed", "Canceled"];
  const filteredOrders = selectedTab === "All" ? orderData : orderData.filter((order) => order.status === selectedTab);

  // const tabs = ["All", "On Process", "Completed", "Canceled"];

  // const filteredOrders =
  //   selectedTab === "All"
  //     ? orderData
  //     : orderData.filter((order) => order.status === selectedTab);


  return (
    <div className="p-1  bg-[#f9f6f2] min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6 mb-3 ">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full lg:max-w-md">
          {summaryData.map((item, idx) => (
            <div
              key={idx}
              className="bg-white leading-11 rounded-xl p-5 shadow-sm hover:cursor-pointer relative"
            >
              <h1 className="text-4xl mb-2">{item.icon}</h1>
              <h2 className="text-2xl font-bold">{item.value}</h2>
              <p className="text-gray-500">{item.title}</p>
              <span className=" absolute top-3 right-10 text-2xl font-semibold">...</span>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
          {/* Line Chart */}
          <div className="bg-white rounded-xl p-5 shadow-sm md:col-span-2 w-full min-h-[330px] h-auto relative">
            <div className="flex justify-between mb-3">
              <h3 className="text-lg font-semibold">Orders Overview</h3>
              <span className="text-sm text-gray-500">This Week</span>
            </div>
            <div className="h-[250px] relative">
              <Line
                data={lineChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false, 
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="bg-white rounded-xl p-5 shadow-sm w-full">
            <div className="flex justify-between mb-3">
              <h3 className="text-lg font-semibold">Order Types</h3>
              <span className="text-sm text-gray-500">Today</span>
            </div>

            <div className=" items-center mb-1">
              {/* Chart */}
              <div className="relative h-30 w-30 sm:h-40 sm:w-40 mx-auto">
                <Doughnut
                  data={doughnutData}
                  options={{
                    plugins: { legend: { display: false } },
                    responsive: true,
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[10px] md:text-sm">
                  Total Order <br />
                  <span className=" text-sm sm:text-xl font-bold">200</span>
                </div>
              </div>

              {/* Labels */}
              <div className="ml-3 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff6a00]"></span>
                  <span className="text-gray-700 font-medium">Dine In</span>
                  <span className="ml-auto font-bold">75</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#fbc275]"></span>
                  <span className="text-gray-700 font-medium">Takeaway</span>
                  <span className="ml-auto font-bold">60</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1f2937]"></span>
                  <span className="text-gray-700 font-medium">Online</span>
                  <span className="ml-auto font-bold">65</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

 <div className="bg-white rounded-xl p-3 shadow-sm">
      {/* Top Filters */}
      <div className="mb-4 flex flex-wrap gap-2 justify-between items-center">
        <div className="space-x-2 mb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium m-1 ${selectedTab === tab ? "bg-[#ff6a00] text-white" : "bg-[#ffe3d1] text-[#ff6a00] hover:bg-[#ffd4b3]"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search order ID, customer, etc"
            className="border border-gray-300 px-3 py-1.5 rounded-lg text-sm w-30 sm:w-72"
          />
          <span className="text-sm text-gray-500">This Week ▼</span>
        </div>
      </div>

      {/* Responsive Table or Cards */}
      <div className="overflow-x-auto rounded-xl">
          <table className="min-w-[640px] w-full text-sm">
            <thead className="bg-bgcolor">
            <tr>
              <th className="px-3 py-4.5">Order ID</th>
              <th className="px-3 py-4.5">Date</th>
              <th className="px-3 py-4.5">Customer</th>
              <th className="px-3 py-4.5">Order Type</th>
              <th className="px-3 py-4.5">Address</th>
              <th className="px-3 py-4.5">Qty</th>
              <th className="px-3 py-4.5">Amount</th>
              <th className="px-3 py-4.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, idx) => (
              <tr key={idx}  onClick={() => navigate(`/order/${order.id}`, { state: order })} className=" hover:bg-gray-50 hover:cursor-pointer">
                <td className="px-3 py-4.5">{order.id}</td>
                <td className="px-3 py-4.5">{order.date}</td>
                <td className="px-3 py-4.5">{order.customer}</td>
                <td className="px-3 py-4.5">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${orderTypeColor[order.type]}`}>
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    {order.type}
                  </span>
                </td>
                <td className="px-3 py-4.5">{order.address}</td>
                <td className="px-3 py-4.5">{order.qty}</td>
                <td className="px-3 py-4.5 text-[#ff6a00] font-medium">{order.amount}</td>
                <td className="px-3 py-4.5">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[order.status]}`}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View Cards */}
      {/* <div className="lg:hidden space-y-4">
        {filteredOrders.map((order, idx) => (
          <div key={idx} className=" rounded-xl p-4 shadow-xl">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-[#ff6a00]">{order.id}</h4>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[order.status]}`}>{order.status}</span>
            </div>
            <p className="text-sm text-gray-500">{order.date}</p>
            <p className="text-sm font-medium">Customer: {order.customer}</p>
            <p className="text-sm font-medium">Type: <span className={`${orderTypeColor[order.type]} px-2 py-0.5 rounded-full`}>{order.type}</span></p>
            <p className="text-sm">Address: {order.address}</p>
            <p className="text-sm">Qty: {order.qty}</p>
            <p className="text-sm text-[#ff6a00] font-semibold">Amount: {order.amount}</p>
          </div>
        ))}
      </div> */}

      {/* Pagination */}
      <div className="mt-4 sm:flex  justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-2 mb-5 sm:mb-0">
          Showing
          <select className="border rounded px-2 py-1">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          out of 312
        </div>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 border rounded text-gray-400">‹</button>
          <button className="px-3 py-1 rounded bg-[#ff6a00] text-white">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">3</button>
          <span className="px-2">...</span>
          <button className="px-3 py-1 border rounded">16</button>
          <button className="px-2 py-1 border rounded text-gray-400">›</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AllOrder;



