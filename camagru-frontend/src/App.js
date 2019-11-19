import React from "react";
import ButtonAppBar from "../src/Components/Navbar/Navbar.js";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Register from "./Components/auth/Register.js";
import Login from "./Components/auth/Login";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Footer from "./Components/Footer/footer";
import Confirm from "./Components/auth/Confirm";
import Navbar from "../src/Components/Navbar/Navbar.js";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authentication";
import ForgotPW from "./Components/auth/ForgotPW.js";
import ResetPW from "./Components/auth/resetPassword.js";
import Profile from "./Components/Profile/Profile.js";

// import "bootstrap/dist/css/bootstrap.min.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          {/* <ButtonAppBar /> */}
          <Navbar />
          <Switch>
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/forgotPassword" exact component={ForgotPW} />
            <Route path="/confirm/:token" exact component={Confirm} />
            <Route path="/resetPassword/:token" exact component={ResetPW} />
            <Route path="/profile" exact component={Profile} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
