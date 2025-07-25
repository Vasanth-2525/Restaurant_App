import React from "react";
import { FaStar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useParams, Link, useNavigate } from "react-router-dom";

const mockProducts = [
    { id: 1, name: "Smokey Supreme Pizza", price: 12, rating: 4.5, category: "Pizza", image: "/1.avif", tags: ["Customizable"] },
    { id: 2, name: "Grilled Salmon", price: 22, rating: 4.7, category: "Seafood", image: "/2.avif", tags: ["Customizable", "10% Off"] },
    { id: 3, name: "Grilled Chicken Delight", price: 18, rating: 4.8, category: "Chicken", image: "/3.avif" },
    { id: 4, name: "Fiery Shrimp Salad", price: 8, rating: 4.4, category: "Salad", image: "/4.avif" },
    { id: 5, name: "Chocolate Lava Cake", price: 10, rating: 4.9, category: "Dessert", image: "/5.avif" },
    { id: 6, name: "Classic Cheeseburger", price: 10, rating: 4.6, category: "Burger", image: "/6.avif", tags: ["Customizable", "Buy 1 Get 1 Free"] },
    { id: 7, name: "Spaghetti Carbonara", price: 15, rating: 4.7, category: "Pasta", image: "/7.avif", tags: ["Seasonal Offer"] },
    { id: 8, name: "Roasted Turkey Legs", price: 8, rating: 4.5, category: "Chicken", image: "/8.avif", tags: ["Customizable"] },
    { id: 9, name: "Sunny Citrus Cake", price: 8.5, rating: 4.8, category: "Dessert", image: "/9.avif", tags: ["Member Discount"] },
];

const similarMenus = [
    { title: "Nuts Berries Oatmeal", category: "Dessert", rating: 4.7, price: "$10.00", image: "/1.avif" },
    { title: "Pineapple Paradise Smoothie", category: "Beverages", rating: 4.5, price: "$8.00", image: "/2.avif" },
    { title: "Green Detox Juice", category: "Beverages", rating: 4.2, price: "$7.00", image: "/3.avif" },
    { title: "Tropical Fruit Salad", category: "Dessert", rating: 4.6, price: "$7.00", image: "/4.avif" },
    { title: "Pineapple Paradise Smoothie", category: "Beverages", rating: 4.5, price: "$8.00", image: "/5.avif" },
    { title: "Pineapple Paradise Smoothie", category: "Beverages", rating: 4.5, price: "$8.00", image: "/6.avif" },
];

const MenuDetails = () => {
    const { id } = useParams();
    const product = mockProducts.find((p) => p.id === parseInt(id));
    const navigate = useNavigate();

    return (
        <div className="min-h-screen p-4 md:p-6 lg:p-0">
            <div className="grid md:grid-cols-3 gap-6">
                {/* Left: Product Details */}
                <div className="md:col-span-2 bg-white p-5 rounded-3xl shadow space-y-8">
                    {/* Product Image */}
                    <div className="rounded-2xl overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-64 object-contain bg-gray rounded-2xl"
                        />
                    </div>

                    {/* Title + Meta */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                            <div className="text-xl font-semibold text-orange-600">${product.price.toFixed(2)}</div>
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

                    {/* Two-Column Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Description + Highlights */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="font-semibold text-lg text-gray-800">Description</h2>
                                <p className="text-gray-600 mt-2">
                                    Refreshing and tropical smoothie bowl with a hint of coconut, topped with fresh fruit.
                                    Perfect for a light meal or a cool dessert.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Tropical & Refreshing", "Creamy & Indulgent", "Nutrient-Rich",
                                    "Naturally Sweet", "Energizing", "Versatile & Customizable",
                                ].map((v, i) => (
                                    <span key={i} className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm">
                                        {v}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div className="space-y-4 p-5 rounded-lg border border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-800">Ingredients</h2>
                            <ul className="list-disc ml-5 text-gray-600 space-y-1 text-sm">
                                {[
                                    "Mango", "Coconut milk", "Banana", "Pineapple", "Coconut flakes",
                                    "Fresh berries (strawberries, blueberries)", "Granola",
                                ].map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                            <button
            onClick={() => navigate(`/addmenus/${product.id}`)}
            className="mt-4 flex items-center gap-2 text-sm bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
          >
            <FiEdit />
            Edit Menu
          </button>
                        </div>
                    </div>

                    {/* Nutrition */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                        {[
                            { label: "Calories", value: "320" },
                            { label: "Proteins", value: "5g" },
                            { label: "Fats", value: "12g" },
                            { label: "Carbo", value: "50g" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl shadow text-center">
                                <h4 className="text-orange-600 font-semibold text-lg">{item.value}</h4>
                                <p className="text-sm text-gray-600">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Insights */}
                <div className="space-y-6">
                    {/* Orders Overview */}
                    <div className="bg-white p-5 rounded-2xl shadow">
                        <h2 className="text-lg font-semibold mb-4">Orders Overview</h2>
                        <div className="grid grid-cols-7 gap-2">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                                <div key={i} className="text-center text-sm flex flex-col items-center">
                                    <div
                                        className="w-9 p-1 rounded bg-orange-100 overflow-hidden flex items-end"
                                        style={{ height: `${(i + 4) * 10}px` }}
                                    >
                                        <div
                                            className="w-full bg-orange-500 rounded-sm"
                                            style={{ height: "70%" }}
                                        ></div>
                                    </div>
                                    <p className="mt-1 text-gray-500">{day}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Similar Menus */}
                    <div className="  rounded-2xl ">
                        <h2 className="text-lg font-semibold mb-4">Similar Menu</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {similarMenus.map((menu, i) => (
                                <div key={i} className="bg-white rounded-xl shadow p-3 text-sm flex flex-col">
                                    <img
                                        src={menu.image}
                                        alt={menu.title}
                                        className="w-full h-36 object-contain rounded-lg bg-gray"
                                    />

                                    <Link
                                        to={`/menu/${product.id}`}
                                        key={product.id}

                                    ><h3 className="font-semibold mt-2 line-clamp-1">{menu.title}</h3></Link>

                                    <p className="text-gray-500 text-xs line-clamp-1">{menu.category}</p>
                                    <div className="flex justify-between items-center mt-1 text-xs text-gray-700">
                                        <span className="flex items-center gap-1 text-yellow-500">
                                            <FaStar className="text-xs" />
                                            {menu.rating}
                                        </span>
                                        <span className="font-bold text-red-500 text-sm">{menu.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>



            </div>
            {/* Reviews */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Reviews</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        {
                            name: "Sarah L.",
                            rating: 5,
                            text: "Absolutely delicious! The mango and coconut flavors are refreshing and perfectly balanced.",
                        },
                        {
                            name: "Michael T.",
                            rating: 4,
                            text: "Very tasty and refreshing. Would love a larger portion. Great choice for a summer day!",
                        },
                        {
                            name: "Michael T.",
                            rating: 4,
                            text: "Very tasty and refreshing. Would love a larger portion. Great choice for a summer day!",
                        },
                    ].map((review, i) => (
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


