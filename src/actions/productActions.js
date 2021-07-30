import axiosWithAuth from "../utils/axiosWithAuth";

export const FETCH_PRODUCTS_START = "FETCH_PRODUCTS_START";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAIL = "FETCH_PRODUCTS_FAIL";

export const POST_PRODUCT_SUCCESS = "POST_PRODUCT_SUCCESS";
export const POST_PRODUCT_FAIL = "POST_PRODUCT_FAIL";

export const getProducts = () => (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_START });
  axiosWithAuth()
    .get("/api/items")
    .then((res) =>
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: FETCH_PRODUCTS_FAIL,
        payload: err.message,
      })
    );
};

export const postProduct = (newProduct) => (dispatch) => {
  axiosWithAuth()
    .post("/api/products", newProduct)
    .then((res) => {
      console.log("FOR THE POST:", res);
      dispatch({ type: POST_PRODUCT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: POST_PRODUCT_FAIL, payload: err.response });
    });
};

export const updateProduct = (newProduct) => (dispatch) => {
  axiosWithAuth()
    .post("/api/products", newProduct)
    .then((res) => {
      console.log("FOR THE POST:", res);
      dispatch({ type: POST_PRODUCT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: POST_PRODUCT_FAIL, payload: err.response });
    });
};
