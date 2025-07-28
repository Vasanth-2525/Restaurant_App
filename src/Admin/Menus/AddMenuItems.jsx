



// AddMenu.jsx (Add Menu Page with Edit, Image Preview & Tag Selection)
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMenu } from "../Context/menuContext";

const categoryOptions = [
  "Pizza", "Burgers", "Chicken", "Beef", "Seafood",
  "Pasta", "Salad", "Bakery", "Desserts"
];

const tagOptions = [
  "Customizable", "Spicy", "Vegan", "Gluten-Free", "New", "Popular", "Low-Calorie"
];

const AddMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const { getMenuById, updateMenu, setMenus } = useMenu();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    rating: "",
    category: "",
    image: "",
    tags: [],
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (isEditMode) {
      const existingItem = getMenuById(id);
      if (existingItem) {
        setFormData(existingItem);
        setImagePreview(existingItem.image);
      }
    }
  }, [id, isEditMode, getMenuById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await compressAndConvertToBase64(file);
      setFormData((prev) => ({ ...prev, image: base64 }));
      setImagePreview(base64);
    }
  };

  const compressAndConvertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 500;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const compressedBase64 = canvas.toDataURL("image/webp", 0.7);
          resolve(compressedBase64);
        };
      };
    });
  };

  const handleTagToggle = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedItem = {
      id: isEditMode ? id : `f${Date.now()}`,
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
    };

    if (isEditMode) {
      updateMenu(updatedItem);
      alert("Menu updated!");
    } else {
      setMenus((prev) => [...prev, updatedItem]);
      alert("Menu added!");
    }

    navigate("/allmenus");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-6xl mx-auto mt-8 mb-20">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {isEditMode ? "Edit" : "Add"} Menu Item
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Image Preview */}
        <div className="flex flex-col items-center gap-4">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-64 h-64 object-cover rounded-xl border" />
          ) : (
            <div className="w-64 h-64 bg-gray-100 flex items-center justify-center border rounded-xl text-gray-500">
              Image Preview
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-gray-700" />
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Food Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 bg-gray-50 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />

          <input
            type="number"
            name="price"
            placeholder="Price ($)"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 bg-gray-50 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating (e.g. 4.5)"
            value={formData.rating}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 bg-gray-50 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 bg-gray-50 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Select Category</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-2">
            {tagOptions.map((tag) => (
              <label key={tag} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  value={tag}
                  checked={formData.tags.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                />
                {tag}
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            {isEditMode ? "Update" : "Add"} Menu Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMenu;


