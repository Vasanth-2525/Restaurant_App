import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const { state: order } = useLocation();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { time: "Oct 12, 2035 - 10:15 AM", label: "Order Placed" },
    { time: "Oct 12, 2035 - 10:18 AM", label: "Order Confirmed" },
    { time: "Oct 12, 2035 - 10:30 AM", label: "Preparing Food" },
    { time: "Oct 12, 2035 - 11:00 AM", label: "Out for Delivery" },
    { time: "Oct 12, 2035 - 11:30 AM", label: "Delivered" },
  ];

  useEffect(() => {
    if (activeStep < steps.length) {
      const timer = setTimeout(() => setActiveStep((prev) => prev + 1), 3000);
      return () => clearTimeout(timer);
    }
  }, [activeStep]);

  const orderItems = [
    {
      image: "/1.avif",
      name: "Smokey Supermme Pizza",
      category: "Pizza",
      qty: 1,
      note: "Extra cheese",
      price: 12,
    },
    {
      image: "/1.avif",
      name: "Garlic Bread",
      category: "Bakery",
      qty: 1,
      note: "Lightly toasted",
      price: 5,
    },
    {
      image: "/1.avif",
      name: "Caesar Salad",
      category: "Salad",
      qty: 2,
      note: "Dressing on the side",
      price: 8,
    },
    {
      image: "/1.avif",
      name: "Chocolate Lava Cake",
      category: "Dessert",
      qty: 1,
      note: "Extra chocolate drizzle",
      price: 10,
    },
  ];

  const total = orderItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  return (
    <div className="  min-h-screen space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <h2 className="text-lg font-bold">
          Order ID <span className="text-[#ff6a00]">#{order?.id}</span>
          <span className="ml-2 text-xs bg-[#1f2937]/10 text-[#1f2937] px-2 py-1 rounded-full">
            {order?.type}
          </span>
        </h2>
        <span className="bg-[#fbc275]/70 text-[#9a5c00] text-sm px-3 py-1 rounded-full w-fit">
          {order?.status}
        </span>
      </div>

      <div className=" lg:flex justify-between">
        <div>
          {/* Order List */}
          <div className="bg-white rounded-xl shadow-sm p-2 md:ml-7 w-full lg:w-[700px]">
            <h3 className="text-md font-semibold mb-4">Order List</h3>

            {/* Table view for lg screens */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr>
                    <th colSpan={5} className="p-0">
                      <div className="bg-bodycolor rounded-3xl overflow-hidden">
                        <table className="w-full">
                          <thead className="">
                            <tr className="text-gray-500 relative">
                              <th className="py-2 pl-24">Item</th>
                              <th className="py-2 px-4 absolute right-89">Qty</th>
                              <th className="py-2 px-4 absolute right-68">Notes</th>
                              <th className="py-2 px-4 absolute right-26">Price</th>
                              <th className="py-2 px-4 absolute right-5 ">Total</th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orderItems.map((item, idx) => (
                    <tr key={idx} className=" shadow">
                      <td className="flex items-center gap-3 py-3 pr-4">
                        <img
                          src={item.image}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-xs text-gray-500">
                            {item.category}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">{item.qty}</td>
                      <td className="px-4 py-3">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs inline-block">
                          {item.note}
                        </span>
                      </td>
                      <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-3 font-semibold">
                        ${(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan="4"
                      className="text-right font-semibold pt-4 pr-4"
                    >
                      Total Amount:
                    </td>
                    <td className="pt-4 font-bold text-[#ff6a00]">
                      ${total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Card view for below lg screens */}
            <div className="lg:hidden space-y-4">
              {orderItems.map((item, idx) => (
                <div key={idx} className=" rounded-2xl p-4 shadow-sm">
                  <div className="flex gap-4 items-start">
                    <img
                      src={item.image}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.category}</p>
                      <p className="mt-2 text-sm">
                        <span className="font-semibold">Qty:</span> {item.qty}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Note:</span> {item.note}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Price:</span> $
                        {item.price.toFixed(2)}
                      </p>
                      <p className="text-sm font-bold text-[#ff6a00] mt-1">
                        Total: ${(item.qty * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-right font-semibold pt-4 pr-2">
                <span>Total Amount:</span>
                <span className="font-bold text-[#ff6a00] ml-2">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2 md:ml-7">
            {/* Customer Card */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold text-sm">Customer</h4>
                <span className="text-xl font-bold text-gray-400">⋮</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="/clint.jpg"
                  className="w-20 h-20 rounded-full object-cover mb-2"
                  alt="customer"
                />
                <h5 className="font-bold text-base">{order.customer}</h5>
                <div className="text-sm text-gray-500 space-y-1 mt-1">
                  <p>📍 {order.address}</p>
                  <p>✉ millerfrank@email.com</p>
                  <p>📞 (555) 345-7890</p>
                </div>
                <div className="flex gap-3 mt-4">
                  <button className="bg-gray-100 px-4 py-2 rounded-md text-sm border border-gray-300 hover:bg-gray-200 transition">
                    Send a Message
                  </button>
                  <button className="bg-[#ff6a00] text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600 transition">
                    Make a Call
                  </button>
                </div>
              </div>
            </div>

            {/* Order Tracking Card */}
            <div className="bg-white rounded-xl shadow-sm p-5 mt-2 mb-2 lg:mt-0 lg:mb-0">
              <h4 className="font-semibold text-sm mb-3">Order Tracking</h4>
              <ul className="text-sm space-y-3">
                {steps.map((step, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-xl h-5 w-5 text-orange flex justify-center items-center ">
                      {i < activeStep ? "✅" : "✓"}
                    </span>
                    <div>
                      <p className="font-medium">{step.label}</p>
                      <p className="text-gray-400 text-xs">{step.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="md:mr-5">
          {/* Map */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-2">
            <h4 className="font-semibold text-sm mb-3">Delivery Route</h4>
            <div className=" h-[300px] lg:w-[400px] lg:h-[520px]">
              <iframe
                title="Delivery Route"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2974.9059438966096!2d78.56217423709884!3d12.496498895531357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac530f5f473391%3A0xa9634efd2abd23e2!2sMarwa%20Restaurant!5e0!3m2!1sen!2sin!4v1753352936485!5m2!1sen!2sin"
                className="w-full h-full rounded-lg border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Driver */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h4 className="font-semibold text-sm mb-3">Driver</h4>
            <div className="flex items-center gap-4">
              <img
                src="/delevery man.jpg"
                alt="driver"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h5 className="font-bold">Jack Anderson</h5>
                <p className="text-green-500 text-sm">Online</p>
                <p className="text-sm text-gray-500">(555) 345-7890</p>
                <p className="text-sm text-gray-500">Motorcycle • MM13140</p>
                <div className="flex gap-2 mt-2">
                  <button className="bg-gray-100 px-3 py-1 rounded text-sm">
                    📞
                  </button>
                  <button className="bg-gray-100 px-3 py-1 rounded text-sm">
                    💬
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
