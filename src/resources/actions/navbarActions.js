const setCategoryType = "SELECT_CATEGORY";
const setCategory = (categoryName) => {
  return {
    type: setCategoryType,
    categoryName: categoryName,
  };
};

const setCurrencyType = "SET_CURRENCY";

const setCurrency = (currency) => {
  return {
    type: setCurrencyType,
    currency: currency,
  };
};

export { setCategory , setCategoryType , setCurrency, setCurrencyType };
