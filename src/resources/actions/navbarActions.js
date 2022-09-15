const selectCategoryType = "SELECT_CATEGORY";
const selectCategory = (categoryName) => {
  return {
    type: selectCategoryType,
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

export { selectCategory, selectCategoryType, setCurrency, setCurrencyType };
