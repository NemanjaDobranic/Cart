import { selectCategoryType } from "../actions/navbarActions";

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
  return state;
};

export default rootReducer;
