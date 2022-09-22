import { addProductType, removeProductType } from "../actions/cartActions";
import {
  findSameProductIndex,
  recalculateTotalPrices,
} from "../commonFunctions/commonFunctions";

const initState = {
  products: [],
  quantity: 0,
  totalPrices: null,
  tax: 0.21,
};

const cartReducer = (state = initState, action) => {
  if (action.type === addProductType) {
    const { product } = action;
    const index = findSameProductIndex(product, state.products);
    const sameProduct = state.products[index];

    if (!sameProduct) {
      state.products.push({ ...product, quantity: 1 });
    } else {
      sameProduct.quantity++;
    }

    if (state.totalPrices) {
      state.totalPrices = state.totalPrices = recalculateTotalPrices(
        product.prices,
        state.totalPrices
      );
    } else {
      state.totalPrices = product.prices;
    }

    state.quantity++;
    return { ...state };
  }

  if (action.type === removeProductType) {
    const { product } = action;
    const index = findSameProductIndex(product, state.products);

    if (product.quantity > 1) {
      state.products[index].quantity--;
    } else {
      state.products.splice(index, 1);
    }

    state.quantity--;

    state.totalPrices = recalculateTotalPrices(
      product.prices,
      state.totalPrices,
      false
    );

    return { ...state };
  }

  return state;
};

export default cartReducer;
