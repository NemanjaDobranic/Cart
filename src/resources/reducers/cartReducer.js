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
    console.log(product);

    //product with with same selected items in all attrs
    const sameProduct = state.products.find((p1) =>
      p1.attributes.length > 0 && product.attributes.length > 0
        ? p1.attributes.every((a1) =>
            product.attributes.find(
              (a2) =>
                JSON.stringify(a1.selectedItem) ===
                JSON.stringify(a2.selectedItem)
            )
          )
        : p1.id === product.id
    );

    console.log(sameProduct);

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
