// import axios from "axios";
// export const FETCHING_API_START = "FETCHING_API_LOADING";
// export const FETCHING_API_SUCCESS = "FETCHING_API_SUCCESS";
// export const FETCHING_API_FAILURE = "FETCHING_API_FAIL";
// export const SEARCH_VALUE = "SEARCH_VALUE";

// export const searchValue = (newSearch) => {
//   //console.log("5. new searchValue is", newSearch);
//   return { type: SEARCH_VALUE, payload: newSearch };
// };

// export const getRecipe = (props) => (dispatch) => {
//   //console.log("Incoming props.searchValue to actions = ", props);
//   const options = {
//     method: "GET",
//     url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
//     params: { query: props },
//     headers: {
//       "x-rapidapi-key": "b461d692bemshe80b4354ca6ba03p184f2ejsn08a3bb994638",
//       "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//     },
//   };
//   //   console.log('options incoming to getRecipe', options)
//   //   console.log("API call is going");
//   dispatch({ type: FETCHING_API_START });

//   axios
//     .request(options)
//     .then((res) => {
//       dispatch({ type: FETCHING_API_SUCCESS, payload: res.data.results });
//       console.log("API call is done", res.data.results);
//     })
//     .catch((error) => {
//       dispatch({ type: FETCHING_API_FAILURE, payload: error });
//       console.log("This API request failed", error);
//     });
// };

import axiosWithAuth from "../../../utils/axiosWithAuth";

export const FETCH_PRODUCTS_LOADING = "FETCH_PRODUCTS_LOADING";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const CREATE_PRODUCT_START = "CREATE_PRODUCT_START";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";
export const FETCH_USER_LOADING = "FETCH_PRODUCTS_LOADING";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const fetchProducts = () => (dispatch) => {
  dispatch({ type: FETCH_USER_LOADING });
  axiosWithAuth()
    .get("/api/products")
    .then((res) =>
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: res.data })
    )
    .catch((err) => dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: err }));
};

export const createProducts = (newProduct, id) => (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_START });
  axiosWithAuth()
    .post(`/api/${id}products`, newProduct)
    .then((res) =>
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: res.data })
    )
    .catch((err) => dispatch({ type: CREATE_PRODUCT_FAILURE, payload: err }));
};

export const fetchUser = () => (dispatch) => {
  dispatch({ type: FETCH_USER_LOADING });
  axiosWithAuth()
    .get("/api/user")
    .then((res) =>
      dispatch({ type: FETCH_USER_SUCCESS, payload: res.data })
    )
    .catch((err) => dispatch({ type: FETCH_USER_FAILURE, payload: err }));
};
