import { addProductType } from "../actions/cartActions";

const initState = {
  products: [],
  quantity: 0,
  totalPrices: null,
  tax: 0.21,
};

const cartReducer = (state = initState, action) => {
  if (action.type === addProductType) {
    const { product } = action;

    //product with with same selected items in all attrs
    const sameProduct = state.products.find((p1) =>
      p1.attributes.every((a1) =>
        product.attributes.find(
          (a2) =>
            JSON.stringify(a1.selectedItem) === JSON.stringify(a2.selectedItem)
        )
      )
    );

    if (!sameProduct) {
      state.products.push({ ...product, quantity: 1 });
    } else {
      sameProduct.quantity++;
    }

    if (state.totalPrices) {
      const newTotalPrices = product.prices.map((price) =>
        state.totalPrices.find((totalPrice) =>
          JSON.stringify(totalPrice.currency) === JSON.stringify(price.currency)
            ? (totalPrice.amount += price.amount)
            : totalPrice.amount
        )
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
