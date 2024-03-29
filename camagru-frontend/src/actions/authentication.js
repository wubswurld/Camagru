import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, REGISTER_SUCESS } from "./types";
import setAuthToken from "../setAuthToken";
import jwt_decode from "jwt-decode";

export const ConfirmEmail = (token, history) => {
  const data = { token: token };
  return axios.post(`/api/users/confirm`, data).then(res => res.status);
  // .catch(err => {
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: err.response.data
  //   });
  // });
};

export const registerUser = (user, history) => {
  return dispatch => {
    return axios
      .post("/api/users/register", user)
      .then(res => res.data)
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  };
};

// export const ConfirmEmail = user

export const loginUser = user => dispatch => {
  axios
    .post("/api/users/login", user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push("/login");
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
