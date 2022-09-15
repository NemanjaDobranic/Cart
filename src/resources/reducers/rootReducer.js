import { selectCategoryType, setCurrencyType } from "../actions/navbarActions";

const initState = {
  categoryName: null,
  currency: null,
};
const rootReducer = (state = initState, action) => {
  if (action.type === selectCategoryType) {
    return {
      ...state,
      categoryName: action.categoryName,
    };
  }

  if (action.type === setCurrencyType) {
    return {
      ...state,
      currency: action.currency,
    };
  }

  return state;
};

export default rootReducer;
