// import axiosWithAuth from "../utils/axiosWithAuth";
// import { createBrowserHistory } from "history";

// export const FETCH_USER_START = "FETCH_USER_START";
// export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
// export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
// export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
// export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

// const userId = localStorage.getItem("id");
// const history = createBrowserHistory()

// export const fetchUser = () => (dispatch) => {
//   dispatch({ type: FETCH_USER_START });
//   axiosWithAuth()
//     .post(`/api/auth/login`)
//     .then((res) => dispatch({ type: FETCH_USER_SUCCESS, payload: res.data }))
//     .catch((err) => dispatch({ type: FETCH_USER_FAILURE, payload: { err } }));
// };

// export const fetchUser = () => (dispatch) => {
//   dispatch({ type: FETCH_USER_START });
//   axiosWithAuth()
//     .post('api/auth/login')
//     .then((res) => {
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user_id", res.data.id);
//       dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
//       console.log(
//         "values for token and id set for login",
//         res.data.token,
//         res.data.id
//       );
    //   let currentUserId = res.data.id;
    //   res.data.isOwner === true
    //     ? history.push("./owner", currentUserId)
    //     : history.push("/products");
//     })
//     .catch((err) => dispatch({ type: FETCH_USER_FAILURE, payload: { err } }));
// };

// export const getUserInfo = (userId) => (dispatch) => {
//   dispatch({ type: FETCH_USER_START });
//   axiosWithAuth()
//     .get(`/api/market/users/${userId}`)
//     .then((res) => {
//       console.log("USER API", res.data);
//       dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch({ type: FETCH_USER_FAIL, payload: err.res });
//     });
// };