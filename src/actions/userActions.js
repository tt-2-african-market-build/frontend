import axiosWithAuth from "../utils/axiosWithAuth";

export const FETCH_USER_START = "FETCH_USER_START";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAIL";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

// const userId = localStorage.getItem("id");

export const fetchUser = () => (dispatch) => {
  dispatch({ type: FETCH_USER_START });
  axiosWithAuth()
    .post(`/api/auth/register`)
    .then((res) => dispatch({ type: FETCH_USER_SUCCESS, payload: res.data }))
    .catch((err) => dispatch({ type: FETCH_USER_FAILURE, payload: {err} }));
};

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

// export const deleteUser = (user) => (dispatch) => {
//   axiosWithAuth()
//     .delete(`/api/market/users/${user.id}`)
//     .then((res) => {
//       console.log("Delete Works", res);
//       dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
//     })
//     .catch((err) => {
//       dispatch({ type: DELETE_USER_FAIL, payload: err.res });
//     });
// };
