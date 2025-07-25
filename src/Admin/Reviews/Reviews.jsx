import React from "react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";
import { TiTick } from "react-icons/ti";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ratingData = [
  { label: "Food Quality", rating: 4.8 },
  { label: "Service", rating: 4.6 },
  { label: "Ambiance", rating: 4.7 },
  { label: "Value for Money", rating: 4.5 },
  { label: "Cleanliness", rating: 4.9 },
];

const reviewStats = [
  { name: "Jan", Positive: 140, Negative: 60 },
  { name: "Feb", Positive: 160, Negative: 55 },
  { name: "Mar", Positive: 150, Negative: 58 },
  { name: "Apr", Positive: 170, Negative: 50 },
  { name: "May", Positive: 180, Negative: 45 },
  { name: "Jun", Positive: 160, Negative: 48 },
  { name: "Jul", Positive: 150, Negative: 50 },
  { name: "Aug", Positive: 170, Negative: 55 },
  { name: "Sep", Positive: 174, Negative: 50 },
  { name: "Oct", Positive: 160, Negative: 52 },
  { name: "Nov", Positive: 165, Negative: 49 },
  { name: "Dec", Positive: 170, Negative: 46 },
];

const sampleReviews = [
  {
    id: 1,
    title: "Classic Italian Penne",
    category: "Pasta",
    date: "Oct 20, 2035",
    rating: 5,
    reviews: 350,
    rate: 4.9,
    user: "Alice Johnson",
    desc: "A delightful dish with perfectly cooked penne pasta and a rich, savory tomato sauce. The flavors are well-balanced and satisfying. Would happily order this again!",
    image: "/8.avif",
  },
  {
    id: 2,
    title: "Grilled Salmon",
    category: "Seafood",
    date: "Sep 21, 2035",
    rating: 4.5,
    reviews: 278,
    rate: 4.8,
    user: "Bob Smith",
    desc: "Fresh and succulent salmon, expertly cooked and lightly seasoned. The subtle flavors perfectly complement the fish's natural richness.",
    image: "/4.avif",
  },
  {
    id: 3,
    title: "Fluffy Scrambled Egg",
    category: "Breakfast",
    date: "Sep 12, 2035",
    rating: 4.7,
    reviews: 216,
    rate: 4.6,
    user: "Charlie Brown",
    desc: "A fresh take on a classic, with crisp greens, tasty dressing, and a balanced flavor that satisfies.",
    image: "/5.avif",
  },
  {
    id: 4,
    title: "Chocolate Lava Cake",
    category: "Dessert",
    date: "Aug 26, 2035",
    rating: 5,
    reviews: 418,
    rate: 4.9,
    user: "Grace Lee",
    desc: "Experience the sensation of chocolate melting in your mouth! The warm, gooey center will leave you wanting more.",
    image: "/6.avif",
  },
];

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);

  useEffect(() => {
    setReviews(sampleReviews);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newReview, setNewReview] = useState({
    title: "",
    category: "",
    user: "",
    rating: 0,
    reviews: 0,
    rate: 0,
    desc: "",
    image: "",
  });

  useEffect(() => {
    setReviews(sampleReviews);
  }, []);

  const handleAddReview = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (editMode) {
    setReviews((prev) =>
      prev.map((rev) =>
        rev.id === editingId ? { ...newReview, date: currentDate, id: editingId } : rev
      )
    );
    setEditMode(false);
    setEditingId(null);
  } else {
    const existingIndex = reviews.findIndex(
      (rev) =>
        rev.title.trim().toLowerCase() === newReview.title.trim().toLowerCase()
    );

    if (existingIndex !== -1) {
      // Existing product: increase review count and update rate
      const updatedReviews = [...reviews];
      const existing = updatedReviews[existingIndex];

      const newCount = existing.reviews + 1;
      const newRate = ((existing.rate * existing.reviews + newReview.rating) / newCount).toFixed(1);

      updatedReviews[existingIndex] = {
        ...existing,
        reviews: newCount,
        rate: parseFloat(newRate),
        date: currentDate,
      };

      setReviews(updatedReviews);
    } else {
      // New product
      const newEntry = {
        ...newReview,
        id: Date.now(),
        date: currentDate,
        reviews: 1,
        rate: parseFloat(newReview.rating),
      };
      setReviews([newEntry, ...reviews]);
    }
  }

  // Reset modal
  setNewReview({
    title: "",
    category: "",
    user: "",
    rating: 0,
    reviews: 0,
    rate: 0,
    desc: "",
    image: "",
  });
  setShowModal(false);
};


  const handleEdit = (review) => {
    setNewReview(review);
    setEditMode(true);
    setEditingId(review.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (confirm) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setCheckedIds((prev) => prev.filter((cid) => cid !== id));
    }
  };

  return (
    <div className=" md:p-0 lg:p-0  min-h-screen">
      <div className="lg:flex gap-6">
        {/* Ratings Card */}
        <div className="bg-white rounded-xl p-2 shadow-sm lg:w-[800px] mb-5 lg:mb-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-md font-semibold text-gray-800">Ratings</h2>
            <span className="text-sm text-gray-500 cursor-pointer">
              This Month
            </span>
          </div>
          <div className=" sm:flex">
            <div className="flex flex-col justify-center items-center mb-6 md:w-fit p-5">
              <div className="text-5xl font-bold text-gray-800">4.7</div>
              <div className="flex text-yellow-400 mt-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">350 Reviews</p>
            </div>

            <div className="space-y-4 w-full p-5">
              {ratingData.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm font-medium mb-1 text-gray-700">
                    <span>{item.label}</span>
                    <span>{item.rating}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${(item.rating / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Chart */}
        <div className="bg-white rounded-xl p-2 md:p-5 shadow-sm w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-md font-semibold text-gray-800">
              Review Statistics
            </h2>
            <span className="text-sm text-gray-500 cursor-pointer">
              This Year
            </span>
          </div>

          <div className="flex gap-4 text-sm mb-4">
            <span className="flex items-center gap-2 text-gray-700">
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
              Positive Review
            </span>
            <span className="flex items-center gap-2 text-gray-700">
              <span className="w-3 h-3 bg-black rounded-full"></span>
              Negative Review
            </span>
          </div>

          <div className="h-40 sm:h-50 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reviewStats}
                barCategoryGap="10%" // Smaller gap between bar groups
                barSize={13} // Controls bar width
              >
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ fontSize: "14px", borderRadius: "6px" }}
                  cursor={{ fill: "rgba(255,106,0,0.1)" }} // Optional: highlight on hover like image
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Positive" fill="#ff6a00" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Negative" fill="#1f1f1f" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Food Reviews  */}
      <div className="min-h-screen  mt-2">
        <div className="max-w-6xl bg-white rounded-xl shadow-sm p-5">
          <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
            <div className="flex gap-3 flex-wrap">
              <select className="px-4 py-2 border rounded-lg text-sm">
                <option>⭐ All Rating</option>
                <option>5 stars</option>
                <option>4 stars & up</option>
              </select>
              <select className="px-4 py-2 border rounded-lg text-sm">
                <option>All Category</option>
                <option>Pasta</option>
                <option>Seafood</option>
                <option>Dessert</option>
              </select>
              <select className="px-4 py-2 border rounded-lg text-sm">
                <option>All Menu</option>
              </select>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 border rounded-lg text-sm transition-all duration-300 text-gray-700 font-bold hover:bg-orange-500 hover:text-white"
            >
              Add Review
            </button>
          </div>

          {reviews.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-6 shadow py-4 p-2 mb-2"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between flex-wrap">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.round(item.rating)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="text-black ml-1">{item.rating}/5</span>
                    <span className="text-gray-400 text-xs ml-2">
                      {item.date}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-gray-600 text-sm">{item.desc}</p>
                <div className="flex justify-between text-sm mt-2">
                  <div className="text-gray-500">
                    <span className="font-medium">{item.reviews}</span> Reviews
                    · <span>{item.rate}</span> Overall Rate
                  </div>

                  <div className="flex gap-2 items-center">
                    <span className="font-semibold">{item.user}</span>
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 text-xs font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 text-xs font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                  <span
                    onClick={() =>
                      setCheckedIds((prev) =>
                        prev.includes(item.id)
                          ? prev.filter((id) => id !== item.id)
                          : [...prev, item.id]
                      )
                    }
                    className="cursor-pointer inline-flex items-center p-2"
                  >
                    {checkedIds.includes(item.id) ? (
                      <TiTick size={25} className="text-green-600" />
                    ) : (
                      <TiTickOutline size={25} className="text-red-500" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}

       
          <div className="sm:flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">
              Showing <strong>{reviews.length}</strong> out of{" "}
              <strong>1,458</strong>
            </p>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded border">‹</button>
              <button className="w-8 h-8 rounded bg-orange-500 text-white">
                1
              </button>
              <button className="w-8 h-8 rounded border">2</button>
              <button className="w-8 h-8 rounded border">3</button>
              <span className="px-2">...</span>
              <button className="w-8 h-8 rounded border">24</button>
              <button className="w-8 h-8 rounded border">›</button>
            </div>
          </div>
        </div>

   
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Add New Review
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Food Title"
                  value={newReview.title}
                  onChange={(e) =>
                    setNewReview({ ...newReview, title: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newReview.category}
                  onChange={(e) =>
                    setNewReview({ ...newReview, category: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Reviewer Name"
                  value={newReview.user}
                  onChange={(e) =>
                    setNewReview({ ...newReview, user: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Rating (1-5)"
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({ ...newReview, rating: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <textarea
                  placeholder="Review Description"
                  value={newReview.desc}
                  onChange={(e) =>
                    setNewReview({ ...newReview, desc: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newReview.image}
                  onChange={(e) =>
                    setNewReview({ ...newReview, image: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddReview}
                  className="px-4 py-2 bg-orange-500 text-white rounded"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
