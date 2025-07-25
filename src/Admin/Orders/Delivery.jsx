import React from "react";
import { useNavigate } from "react-router-dom";

const Deliverys = () => {
  const navigate = useNavigate();

  const orderData = [
    { id: "ORD1024", date: "2035-10-26 12:47 AM", customer: "Bob Smith", type: "Takeaway", address: "-", qty: 2, amount: "$24.00", status: "Cancelled" },
    { id: "ORD1027", date: "2035-10-26 03:47 PM", customer: "Eve Carter", type: "Online", address: "123 Elm Street", qty: 1, amount: "$15.00", status: "Completed" },
    { id: "ORD1028", date: "2035-10-22 11:47 AM", customer: "Frank Miller", type: "Online", address: "456 Pine Avenue", qty: 4, amount: "$35.00", status: "Completed" },
    { id: "ORD1029", date: "2035-10-27 09:47 AM", customer: "Grace Lee", type: "Takeaway", address: "-", qty: 2, amount: "$22.00", status: "Cancelled" },
    { id: "ORD1031", date: "2035-10-21 05:47 PM", customer: "Ivan Tucker", type: "Online", address: "789 Oak Lane", qty: 5, amount: "$60.00", status: "Completed" },
    { id: "ORD1032", date: "2035-10-25 02:47 PM", customer: "Jessica Fox", type: "Online", address: "321 Maple Road", qty: 2, amount: "$25.00", status: "On Process" },
  ];

  const statusColor = {
    Completed: "bg-[#ff6a00]/90 text-white",
    "On Process": "bg-[#fbc275]/70 text-[#9a5c00]",
    Canceled: "bg-[#1f2937] text-white",
  };

  const orderTypeColor = {
    Takeaway: "text-[#fbc275] bg-[#fbc275]/20",
    Online: "text-[#1f2937] bg-[#1f2937]/10",
  };

  const deliveryOrders = orderData.filter(order => order.type === "Online" || order.type === "Takeaway");

  return (
    <div className="p-4 bg-white min-h-screen">
    

       <div className="overflow-x-auto rounded-xl">
          <table className="min-w-[640px] w-full text-sm">
            <thead className="bg-bgcolor">
            <tr>
              <th className="px-3 py-4 text-left">Order ID</th>
              <th className="px-3 py-4 text-left">Date</th>
              <th className="px-3 py-4 text-left">Customer</th>
              <th className="px-3 py-4 text-left">Type</th>
              <th className="px-3 py-4 text-left">Address</th>
              <th className="px-3 py-4 text-left">Qty</th>
              <th className="px-3 py-4 text-left">Amount</th>
              <th className="px-3 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {deliveryOrders.map((order, idx) => (
              <tr key={idx} onClick={() => navigate(`/order/${order.id}`, { state: order })} className="hover:bg-gray-50 hover:cursor-pointer">
                <td className="px-3 py-4">{order.id}</td>
                <td className="px-3 py-4">{order.date}</td>
                <td className="px-3 py-4">{order.customer}</td>
                <td className="px-3 py-4">
                  <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${orderTypeColor[order.type]}`}>
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    {order.type}
                  </span>
                </td>
                <td className="px-3 py-4">{order.address}</td>
                <td className="px-3 py-4">{order.qty}</td>
                <td className="px-3 py-4 text-[#ff6a00] font-semibold">{order.amount}</td>
                <td className="px-3 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[order.status]}`}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deliverys;