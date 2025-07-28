
import React, { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState([
    {
      id: "1",
      name: "Smokey Supreme Pizza",
      price: 12.5,
      rating: 4.5,
      category: "Pizza",
      image: "/1.avif",
      tags: ["Customizable"],
    },
    {
      id: "2",
      name: "Grilled Salmon",
      price: 22,
      rating: 4.7,
      category: "Seafood",
      image: "/2.avif",
      tags: ["Customizable", "10% Off"],
    },
    {
      id: "3",
      name: "Grilled Chicken Delight",
      price: 18,
      rating: 4.8,
      category: "Chicken",
      image: "/3.avif",
      tags: ["Customizable", "10% Off"],
    },
    {
      id: "4",
      name: "Fiery Shrimp Salad",
      price: 8,
      rating: 4.4,
      category: "Salad",
      image: "/4.avif",
      tags: ["Customizable", "10% Off"],
    },
    {
      id: "5",
      name: "Chocolate Lava Cake",
      price: 10,
      rating: 4.9,
      category: "Dessert",
      image: "/5.avif",
      tags: ["Customizable", "10% Off"],
    },
    {
      id: "6",
      name: "Classic Cheeseburger",
      price: 10,
      rating: 4.6,
      category: "Burger",
      image: "/6.avif",
      tags: ["Customizable", "Buy 1 Get 1 Free"],
    },
    {
      id: "7",
      name: "Spaghetti Carbonara",
      price: 15,
      rating: 4.7,
      category: "Pasta",
      image: "/7.avif",
      tags: ["Seasonal Offer"],
    },
    {
      id: "8",
      name: "Roasted Turkey Legs",
      price: 8,
      rating: 4.5,
      category: "Chicken",
      image: "/8.avif",
      tags: ["Customizable"],
    },
    {
      id: "9",
      name: "Sunny Citrus Cake",
      price: 8.5,
      rating: 4.8,
      category: "Dessert",
      image: "/9.avif",
      tags: ["Member Discount"],
    },
  ]);

  const updateMenu = (updatedItem) => {
    setMenus((prev) =>
      prev.map((menu) => (menu.id === updatedItem.id ? updatedItem : menu))
    );
  };

  const getMenuById = (id) => menus.find((m) => m.id === id);

  return (
    <MenuContext.Provider value={{ menus, setMenus, updateMenu, getMenuById }}>
      {children}
    </MenuContext.Provider>
  );
};
