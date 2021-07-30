import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_FAIL,
} from "../actions";

const initialState = {
  data: [],
  fetchingProducts: false,
  error: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_START:
      return {
        ...state,
        data: [],
        fetchingProduct: true,
        error: ""
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        fetchingProducts: false,
        error: "",
      };

    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        data: [],
        fetchingProducts: false,
        error: action.payload,
      };

    case POST_PRODUCT_SUCCESS:
      return {};

    case POST_PRODUCT_FAIL:
      return {};

    default:
      return state;
  }
};

export default productReducer;
