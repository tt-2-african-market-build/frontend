// import {
//     FETCHING_API_START,
//     FETCHING_API_SUCCESS,
//     FETCHING_API_FAILURE,
//     SEARCH_VALUE,
//   } from "./Actions";

//   //const log = console.log;

//   //1. set initialState
//   const initialState = {
//     loading: false,
//     error: "",
//     searchValue: "",
//   };

//   //2. create a features reducer that takes in initialState, sets it equal to state, and takes in an action
//   export const appReducer = (state = initialState, action) => {
//     //3. initialize switch statement
//     switch (action.type) {
//       case FETCHING_API_START: {
//         //log("FETCH RUNNING THROUGH REDUCER");
//         return { ...state, loading: true };
//       }
//       case FETCHING_API_SUCCESS: {
//         //log("FETCH SUCCESS THROUGH REDUCER");
//         return { ...state, loading: false, recipe: action.payload };
//       }
//       case FETCHING_API_FAILURE: {
//         //log("FETCH FAIL FROM REDUCER");
//         return { ...state, loading: false, error: action.payload };
//       }
//       case SEARCH_VALUE: {
//         //log("3. SEARCH VALUE FROM REDUCER", action.payload);
//         return { ...state, searchValue: action.payload };
//       }
//       default:
//         return state;
//     }
//   };

import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_LOADING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_LOADING,
  FETCH_USER_SUCCESS,
} from "./Actions";

//1. set initialState
const initialState = {
  productData: [],
  loading: false,
  error: "",
  userData: {},
};

//2. create a features reducer that takes in initialState, sets it equal to state, and takes in an action
export const appReducer = (state = initialState, action) => {
  //3. initialize switch statement
  switch (action.type) {
    case FETCH_PRODUCTS_LOADING: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        productData: action.payload,
        error: "",
      };
    }
    case FETCH_PRODUCTS_FAILURE: {
      return {
        ...state,
        loading: false,
        productData: [],
        error: action.payload,
      };
    }
    case CREATE_PRODUCT_START: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case CREATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        productData: [...state, action.payload],
        error: "",
      };
    }
    case CREATE_PRODUCT_FAILURE: {
      return {
        ...state,
        productData: [],
        error: action.payload,
      };
    }
    case FETCH_USER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        error: null,
        loading: false,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        userData: {},
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
