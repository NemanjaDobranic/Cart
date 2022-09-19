import { setCategoryType, setCurrencyType } from "../actions/navbarActions";

const initState = {
  categoryName: null,
  currency: null,
};
const navbarReducer = (state = initState, action) => {
  if (action.type === setCategoryType) {
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

export default navbarReducer;
