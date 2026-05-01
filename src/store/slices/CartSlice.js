import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // مصفوفة المنتجات
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const isExist = state.items.find((item) => item.id === product.id);
      if (isExist) {
        isExist.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const product = action.payload;
      const isExist = state.items.find((item) => item.id === product.id);
      if (isExist.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== product.id);
      } else if (isExist.quantity > 1) {
        isExist.quantity -= 1;
      }
    },
    deleteFromCart: (state, action) => {
      const product = action.payload;
      state.items = state.items.filter((item) => item.id !== product.id);
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
