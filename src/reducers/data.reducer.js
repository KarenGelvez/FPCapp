import {types} from '../Types';

const initialState = {
  categoriesList: [],
  classificationsList: [],
  productsList: [],
  ingredientsList: [],
  requirements: {},
  selectedIngredients: [],
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getCategories:
      return {
        ...state,
        categoriesList: action.payload,
      };
    case types.getClassifications:
      return {
        ...state,
        classificationsList: action.payload,
      };
    case types.getProducts:
      return {
        ...state,
        productsList: action.payload,
      };
    case types.getIngredients:
      return {
        ...state,
        ingredientsList: action.payload,
      };
    case types.getRequirements:
      return {
        ...state,
        requirements: action.payload,
      };
    case types.selectedIngredients:
      return {
        ...state,
        selectedIngredients: action.payload,
      };

    default:
      return state;
  }
};
