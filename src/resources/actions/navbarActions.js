const selectCategoryType = "SELECT_CATEGORY";
const selectCategory = (categoryName) => {
  return {
    type: selectCategoryType,
    categoryName: categoryName,
  };
};

export { selectCategory, selectCategoryType };
