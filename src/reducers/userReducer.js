import {
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../actions";

const initialState = {
  data: {},
  fetchingUser: false,
  error: "",
};

export const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_START:
      return {
        ...state,
        data: {},
        fetchingUser: true,
        error: ""
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        data: {username: action.payload},
        fetchingUser: false,
        error: "",
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        data: {},
        fetchingUser: false,
        error: action.payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        singleUser: {
          //   ...state.singleUser.filter((item) => item.id !== action.payload),
          ...state.singleUser,
        },
        fetchingUser: true,
        error: action.payload,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        fetchingUser: false,
        error: action.payload,
      };

    default:
      return state;
  }
};