import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
  option: "Delivery",
};
export const auth = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      return { ...state, order: [...state.order, action.payload] };
    },
    removeItem: (state, action) => {
      return initialState;
    },
    clearCart: () => {
      return initialState;
    },
    addQuantity: (state, action) => {
      const index = state.order.findIndex((object) => {
        return object.itemId === action.payload;
      });

      const extrasPrice = state.order[index].extras.reduce((total, current) => {
        return total + current.price;
      }, 0);
      const updateditems = [
        ...state.order.toSpliced(index, 1, {
          ...state.order[index],
          quantity: state.order[index].quantity + 1,
          total:
            (state.order[index].quantity + 1) *
            (extrasPrice + state.order[index].price),
        }),
      ];
      return {
        ...state,
        order: updateditems,
      };
    },
    subtractQuantity: (state, action) => {
      const index = state.order.findIndex((object) => {
        return object.itemId === action.payload;
      });

      if (state.order[index].quantity <= 1) {
        const updateditems = [...state.order.toSpliced(index, 1)];
        return {
          ...state,
          order: updateditems,
        };
      }

      const extrasPrice = state.order[index].extras.reduce((total, current) => {
        return total + current.price;
      }, 0);
      const updateditems = [
        ...state.order.toSpliced(index, 1, {
          ...state.order[index],
          quantity: state.order[index].quantity - 1,
          total:
            (state.order[index].quantity - 1) *
            (extrasPrice + state.order[index].price),
        }),
      ];
      return {
        ...state,
        order: updateditems,
      };
    },
    selectOption: (state, action) => {
      return {
        ...state,
        option: action.payload,
      };
    },
  },
});

export const {
  addItem,
  removeItem,
  addQuantity,
  subtractQuantity,
  selectOption,
  clearCart,
} = auth.actions;
export default auth.reducer;
