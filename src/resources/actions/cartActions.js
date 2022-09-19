const addProductType = "ADD_PRODUCT";
const addProduct = (product) => {
  return {
    type: addProductType,
    product: product,
  };
};

export { addProductType, addProduct };
