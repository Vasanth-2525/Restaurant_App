import React, { useState } from "react";
import { FaStar, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

// Constants
const categories = ["Chicken", "Beef", "Seafood", "Pizza", "Pasta", "Burgers", "Salad", "Bakery", "Desserts", "Beverages", "Others"];
const meals = ["Breakfast", "Lunch", "Snack", "Dinner"]; // Can be extended for real data
const priceRanges = ["$5 - $10", "$10 - $20", "$20 - $30", "Above $30"];
const ratings = [5, 4, 3, 2, 1];
const promos = ["Buy 1 Get 1 Free", "10% Off", "Seasonal Offers", "Member Discount"];

// Mock products
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

const AllMenus = () => {
    const [search, setSearch] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState("");
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedPromos, setSelectedPromos] = useState([]);
    const [sortBy, setSortBy] = useState("popular");

    // Handle checkbox toggles
    const toggleCheckbox = (item, list, setList) => {
        setList((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    };

    // Filter Logic
    const filteredProducts = mockProducts.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesPromo = selectedPromos.length === 0 || (product.tags && selectedPromos.some(promo => product.tags.includes(promo)));
        const matchesRating = !selectedRating || Math.floor(product.rating) === selectedRating;

        // Price filter
        let matchesPrice = true;
        if (selectedPriceRange) {
            if (selectedPriceRange === "$5 - $10") matchesPrice = product.price >= 5 && product.price <= 10;
            else if (selectedPriceRange === "$10 - $20") matchesPrice = product.price > 10 && product.price <= 20;
            else if (selectedPriceRange === "$20 - $30") matchesPrice = product.price > 20 && product.price <= 30;
            else if (selectedPriceRange === "Above $30") matchesPrice = product.price > 30;
        }

        return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesPromo;
    });

    // Sort
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === "priceLow") return a.price - b.price;
        if (sortBy === "priceHigh") return b.price - a.price;
        return b.rating - a.rating;
    });

    return (
        <div className="flex gap-3 min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 p-6 bg-white shadow-lg rounded-2xl hidden md:block">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Filters</h2>

                {/* Category */}
                <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-700 mb-3">Category</h3>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat) => (
                            <label key={cat} className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => toggleCheckbox(cat, selectedCategories, setSelectedCategories)}
                                    className="w-4 h-4 border-2 border-gray-300 bg-white rounded checked:bg-orange-500 checked:border-orange-500"
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Meals */}
                <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-700 mb-3">Meal Times</h3>
                    <div className="space-y-2">
                        {meals.map((meal) => (
                            <label key={meal} className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition">
                                <input
                                    type="checkbox"
                                    checked={selectedMeals.includes(meal)}
                                    onChange={() => toggleCheckbox(meal, selectedMeals, setSelectedMeals)}
                                    className="w-4 h-4 border-2 border-gray-300 bg-white rounded checked:bg-orange-500 checked:border-orange-500"
                                />
                                {meal}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-700 mb-3">Price Range</h3>
                    <div className="space-y-2">
                        {priceRanges.map((price) => (
                            <label key={price} className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition">
                                <input
                                    type="radio"
                                    name="price"
                                    checked={selectedPriceRange === price}
                                    onChange={() => setSelectedPriceRange(price)}
                                    className="w-4 h-4 border-2 rounded-full border-gray-300 bg-white checked:bg-orange-500 checked:border-orange-500"
                                />
                                {price}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Ratings */}
                <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-700 mb-3">Rating</h3>
                    <div className="space-y-2">
                        {ratings.map((rate) => (
                            <label key={rate} className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition">
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={selectedRating === rate}
                                    onChange={() => setSelectedRating(rate)}
                                    className="w-4 h-4 border-2 rounded-full border-gray-300 bg-white checked:bg-orange-500 checked:border-orange-500"
                                />
                                <div className="flex">{[...Array(rate)].map((_, i) => <FaStar key={i} className="text-yellow-400 text-sm" />)}</div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Promos */}
                <div>
                    <h3 className="text-md font-semibold text-gray-700 mb-3">Promos</h3>
                    <div className="space-y-2">
                        {promos.map((promo) => (
                            <label key={promo} className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition">
                                <input
                                    type="checkbox"
                                    checked={selectedPromos.includes(promo)}
                                    onChange={() => toggleCheckbox(promo, selectedPromos, setSelectedPromos)}
                                    className="w-4 h-4 border-2 border-gray-300 bg-white rounded checked:bg-orange-500 checked:border-orange-500"
                                />
                                {promo}
                            </label>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 p-4 bg-white shadow gap-2">
                {/* Search + Sort */}
                <div className="flex items-center justify-between mb-4">
                    <div className="relative w-full  max-w-md">
                        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            className="w-full border rounded-lg py-2 pl-10 pr-20 focus:outline-0 bg-gray text-white"
                            placeholder="Search for menu"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-orange-500 text-white px-3 py-1 rounded-md text-sm hover:bg-orange-600 transition">Search</button>
                    </div>
                    <select className="ml-4 bg-gray text-white rounded-lg px-4 py-2" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="popular">Popular</option>
                        <option value="priceLow">Low to High</option>
                        <option value="priceHigh">High to Low</option>
                    </select>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 py-7 sm:grid-cols-2 rounded-lg lg:grid-cols-3 gap-5">
                    {sortedProducts.map((product) => (
                        <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="relative group overflow-hidden rounded-md">
                               <Link
                                to={`/menu/${product.id}`}
                                key={product.id}

                            ><img src={product.image} alt={product.name} className="w-full h-50 object-cover bg-gray rounded-md transform transition-transform duration-300 group-hover:scale-105" /></Link> 
                                {product.tags?.[0] && (
                                    <div className="absolute top-2 left-2 z-10">
                                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full shadow">{product.tags[0]}</span>
                                    </div>
                                )}
                                {product.tags?.[1] && (
                                    <div className="absolute bottom-2 right-2 z-10">
                                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow">{product.tags[1]}</span>
                                    </div>
                                )}
                            </div>
                            <Link
                                to={`/menu/${product.id}`}
                                key={product.id}

                            ><h3 className="font-semibold mt-3 mb-2">{product.name}</h3></Link>

                            <p className="text-sm text-orange-500">{product.category}</p>
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-yellow-400 flex items-center text-sm"><FaStar className="mr-1" />{product.rating}</span>
                                <div className="font-bold text-orange-600 mt-2">₹{product.price.toFixed(2)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AllMenus;



