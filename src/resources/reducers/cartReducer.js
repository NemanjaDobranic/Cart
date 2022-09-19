import { addProductType } from "../actions/cartActions";

const initState = {
  products: [],
  quantity: 0,
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
    state.quantity++;

    return state;
  }

  return state;
};

export default cartReducer;
