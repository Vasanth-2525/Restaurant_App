import React, { useState, useEffect } from "react";

const dummyOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    type: "Online",
    totalAmount: 450,
    status: "Canceled",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    type: "Takeaway",
    totalAmount: 320,
    status: "Completed",
  },
  {
    id: "ORD003",
    customer: "Arun Kumar",
    type: "Dine-In",
    totalAmount: 600,
    status: "Canceled",
  },
  {
    id: "ORD004",
    customer: "Divya Raj",
    type: "Online",
    totalAmount: 280,
    status: "On Process",
  },
  {
    id: "ORD005",
    customer: "Sneha Sharma",
    type: "Online",
    totalAmount: 510,
    status: "Canceled",
  },
];

const CancelOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const filtered = dummyOrders.filter((order) => order.status === "Canceled");
    setOrders(filtered);
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">

      {orders.length === 0 ? (
        <p className="text-gray-500">No cancelled orders found.</p>
      ) : (
        
    
       <div className="overflow-x-auto rounded-xl">
          <table className="min-w-[640px] w-full text-sm">
            <thead className="bg-bgcolor">
              <tr>
                <th className="py-4 px-4 text-left">Order ID</th>
                <th className="py-4 px-4 text-left">Customer</th>
                <th className="py-4 px-4 text-left">Type</th>
                <th className="py-4 px-4 text-left">Amount</th>
                <th className="py-4 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className=" hover:bg-gray-50">
                  <td className="py-4 px-4">{order.id}</td>
                  <td className="py-4 px-4">{order.customer}</td>
                  <td className="py-4 px-4">{order.type}</td>
                  <td className="py-4 px-4">₹{order.totalAmount}</td>
                  <td className="py-4 px-4 text-red-600 font-medium">
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CancelOrders;
