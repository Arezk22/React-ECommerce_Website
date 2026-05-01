import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // وظيفة الإضافة للسلة
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // فحص هل المنتج موجود مسبقاً؟
      const isExist = prevItems.find((item) => item.id === product.id);
      if (isExist) {
        // إذا موجود، نزيد الكمية فقط
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      // إذا جديد، نضيفه ونضع الكمية 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product) => {
    setCartItems((prevItems) => {
      const isExist = prevItems.find((item) => item.id === product.id);
      if (isExist.quantity === 1) {
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }
    });
  };
  const deleteFromCart = (product) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== product.id),
    );
  };
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, deleteFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
