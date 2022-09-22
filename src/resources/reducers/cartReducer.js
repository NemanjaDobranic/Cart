import { addProductType } from "../actions/cartActions";
import { findSameProductIndex } from "../commonFunctions/commonFunctions";

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
      const newTotalPrices = [];
      state.totalPrices.forEach((totalPrice) =>
        product.prices.forEach((price) => {
          if (
            JSON.stringify(totalPrice.currency) ===
            JSON.stringify(price.currency)
          ) {
            newTotalPrices.push({
              ...totalPrice,
              amount: totalPrice.amount + price.amount,
            });
          }
        })
      );
      state.totalPrices = newTotalPrices;
    } else {
      state.totalPrices = product.prices;
    }

    state.quantity++;
    return { ...state };
  }

  return state;
};

export default cartReducer;
