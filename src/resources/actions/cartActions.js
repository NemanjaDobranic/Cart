const addProductType = "ADD_PRODUCT";
const addProduct = (product) => {
  return {
    type: addProductType,
    product: product,
  };
};

const removeProductType = "REMOVE_PRODUCT";
const removeProduct = (product) => {
  return {
    type: removeProductType,
    product: product,
  };
};

export { addProductType, addProduct, removeProductType, removeProduct };
