

import React, { useState } from "react";
import { FaStar, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMenu } from "../Context/menuContext";

const categories = ["Chicken", "Beef", "Seafood", "Pizza", "Pasta", "Burgers", "Salad", "Bakery", "Desserts", "Beverages", "Others"];
const priceRanges = ["$5 - $10", "$10 - $20", "$20 - $30", "Above $30"];
const ratings = [5, 4, 3, 2, 1];
const promos = ["Buy 1 Get 1 Free", "10% Off", "Seasonal Offer", "Member Discount", "Customizable"];

const AllMenus = () => {
  const { menus } = useMenu();
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPromos, setSelectedPromos] = useState([]);
  const [sortBy, setSortBy] = useState("popular");

  const toggleCheckbox = (item, list, setList) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const filteredProducts = menus.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPromo = selectedPromos.length === 0 || (product.tags && selectedPromos.some(p => product.tags.includes(p)));
    const matchesRating = !selectedRating || Math.floor(product.rating) === selectedRating;

    let matchesPrice = true;
    if (selectedPriceRange) {
      if (selectedPriceRange === "$5 - $10") matchesPrice = product.price >= 5 && product.price <= 10;
      else if (selectedPriceRange === "$10 - $20") matchesPrice = product.price > 10 && product.price <= 20;
      else if (selectedPriceRange === "$20 - $30") matchesPrice = product.price > 20 && product.price <= 30;
      else if (selectedPriceRange === "Above $30") matchesPrice = product.price > 30;
    }

    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesPromo;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    return b.rating - a.rating;
  });

  return (
    <div className="flex gap-3 min-h-screen bg-gray-50">
      <aside className="w-64 p-6 bg-white shadow-lg rounded-2xl hidden md:block">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Filters</h2>

        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-700 mb-3">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <label key={cat} className="text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCheckbox(cat, selectedCategories, setSelectedCategories)}
                  className="mr-2"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-700 mb-3">Price</h3>
          {priceRanges.map((range) => (
            <label key={range} className="block text-sm text-gray-600">
              <input
                type="radio"
                name="price"
                checked={selectedPriceRange === range}
                onChange={() => setSelectedPriceRange(range)}
                className="mr-2"
              />
              {range}
            </label>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-700 mb-3">Rating</h3>
          {ratings.map((rate) => (
            <label key={rate} className="block text-sm text-gray-600">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === rate}
                onChange={() => setSelectedRating(rate)}
                className="mr-2"
              />
              {[...Array(rate)].map((_, i) => <FaStar key={i} className="text-yellow-400 inline" />)}
            </label>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-700 mb-3">Promos</h3>
          {promos.map((promo) => (
            <label key={promo} className="block text-sm text-gray-600">
              <input
                type="checkbox"
                checked={selectedPromos.includes(promo)}
                onChange={() => toggleCheckbox(promo, selectedPromos, setSelectedPromos)}
                className="mr-2"
              />
              {promo}
            </label>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for menu"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4"
            />
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="ml-4 px-4 py-2 rounded bg-orange-500 text-white">
            <option value="popular">Popular</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {sortedProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow">
              <Link to={`/menu/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md"
                />
              </Link>
              <h3 className="text-lg font-semibold mt-2 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-orange-500">{product.category}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="flex items-center gap-1 text-yellow-400 text-sm">
                  <FaStar /> {product.rating}
                </span>
                <span className="font-bold text-orange-600">₹{product.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllMenus;
