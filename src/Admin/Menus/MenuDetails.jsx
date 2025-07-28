




// MenuDetails.jsx
// MenuDetails.jsx (Dynamic View with Similar Menus)
import React from "react";
import { FaStar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useMenu } from "../Context/menuContext";

const MenuDetails = () => {
  const { id } = useParams();
  const { getMenuById, menus } = useMenu();
  const navigate = useNavigate();
  const product = getMenuById(id);

  if (!product) return <div className="p-5 text-red-500">Product not found</div>;

  const similarMenus = menus.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-0">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-5 rounded-3xl shadow space-y-8">
          <div className="rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-contain bg-gray rounded-2xl"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              <div className="text-xl font-semibold text-orange-600">₹{product.price.toFixed(2)}</div>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-orange-500 font-medium">
              <span>{product.category}</span>
              {product.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <FaStar className="text-yellow-400" /> {product.rating}/5 Rating
              </span>
              <span>85 Reviews</span>
              <span>120 Orders</span>
              <span>45 Favorites</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h2 className="font-semibold text-lg text-gray-800">Description</h2>
                <p className="text-gray-600 mt-2">
                  Enjoy our freshly crafted {product.name} from the {product.category} menu. Made with top ingredients and customer love!
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Tropical & Refreshing", "Creamy", "Popular", "Customizable", "Energizing", "Tasty"].map((v, i) => (
                  <span key={i} className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm">
                    {v}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4 p-5 rounded-lg border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Ingredients</h2>
              <ul className="list-disc ml-5 text-gray-600 space-y-1 text-sm">
                {["Cheese", "Tomato", "Herbs", "Sauce", "Spices"].map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <button
                onClick={() => navigate(`/addmenus/${product.id}`)}
                className="mt-4 flex items-center gap-2 text-sm bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
              >
                <FiEdit /> Edit Menu
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[{ label: "Calories", value: "320" }, { label: "Proteins", value: "5g" }, { label: "Fats", value: "12g" }, { label: "Carbo", value: "50g" }].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow text-center">
                <h4 className="text-orange-600 font-semibold text-lg">{item.value}</h4>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Orders Overview</h2>
            <div className="grid grid-cols-7 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                <div key={i} className="text-center text-sm flex flex-col items-center">
                  <div className="w-9 p-1 rounded bg-orange-100 overflow-hidden flex items-end" style={{ height: `${(i + 4) * 10}px` }}>
                    <div className="w-full bg-orange-500 rounded-sm" style={{ height: "70%" }}></div>
                  </div>
                  <p className="mt-1 text-gray-500">{day}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl">
            <h2 className="text-lg font-semibold mb-4">Similar Menus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {similarMenus.map((menu, i) => (
                <div key={menu.id} className="bg-white rounded-xl shadow p-3 text-sm flex flex-col">
                  <img src={menu.image} alt={menu.name} className="w-full h-36 object-contain rounded-lg bg-gray" />
                  <Link to={`/menu/${menu.id}`}><h3 className="font-semibold mt-2 line-clamp-1">{menu.name}</h3></Link>
                  <p className="text-gray-500 text-xs line-clamp-1">{menu.category}</p>
                  <div className="flex justify-between items-center mt-1 text-xs text-gray-700">
                    <span className="flex items-center gap-1 text-yellow-500">
                      <FaStar className="text-xs" /> {menu.rating}
                    </span>
                    <span className="font-bold text-red-500 text-sm">₹{menu.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{
            name: "Sarah L.",
            rating: 5,
            text: "Absolutely delicious! Fresh and perfectly balanced."
          }, {
            name: "Michael T.",
            rating: 4,
            text: "Great value and taste. Could use more portion size."
          }].map((review, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{review.name}</span>
                <span className="text-yellow-500 flex items-center gap-1">
                  <FaStar /> {review.rating}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-2">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;

