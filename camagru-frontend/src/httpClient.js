import axios from "axios";
import jwtDecode from "jwt-decode";

// instantiate axios
const httpClient = axios.create();

httpClient.getToken = function() {
  return localStorage.getItem("token");
};

httpClient.setToken = function(token) {
  localStorage.setItem("token", token);
  return token;
};

httpClient.logOut = function() {
  localStorage.removeItem("token");
  delete this.defaults.headers.common.token;
  return true;
};
