// import React, { Component } from "react";
// import Paper from "@material-ui/core/Paper";
// import mySvg from "../../assets/photographer-clipart-tripod-3.png";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { loginUser } from "../../actions/authentication";

// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
//       errors: {}
//     };
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleInputChange(e) {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     const user = {
//       email: this.state.email,
//       password: this.state.password
//     };
//     this.props.loginUser(user);
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({
//         errors: nextProps.errors
//       });
//     }
//   }

//   render() {
//     return (
//       <div
//         className="container"
//         style={{ marginTop: "50px", width: "700px", display: "inline-block" }}
//       >
//         <Paper
//           style={{
//             alignContent: "center",
//             marginTop: "10%",
//             backgroundColor: "#edf5e1"
//           }}
//         >
//           <img className="image" src={mySvg} alt="not here"></img>
//           <div className="vl"></div>
//           <div style={{ float: "left" }}>
//             <h2
//               style={{
//                 marginBottom: "40px",
//                 float: "left",
//                 marginLeft: "20px",
//                 textDecoration: "underline"
//               }}
//             >
//               Login
//             </h2>
//             <form onSubmit={this.handleSubmit}>
//               <div className="form-group" style={{ marginTop: "65%" }}>
//                 <TextField
//                   id="text-field"
//                   placeholder="Email"
//                   className="form-control"
//                   name="email"
//                   onChange={this.handleInputChange}
//                   value={this.state.email}
//                 />
//               </div>
//               <div className="form-group">
//                 <TextField
//                   id="text-field2"
//                   type="password"
//                   placeholder="Password"
//                   className="form-control"
//                   name="password"
//                   onChange={this.handleInputChange}
//                   value={this.state.password}
//                 />
//               </div>
//               <div className="form-group">
//                 <Button
//                   color="primary"
//                   variant="outlined"
//                   type="submit"
//                   className="btn btn-primary"
//                   style={{ marginTop: "20%" }}
//                 >
//                   Login User
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </Paper>
//       </div>
//     );
//   }
// }

// Login.propTypes = {
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   errors: state.errors
// });

// export default connect(mapStateToProps, { loginUser })(Login);
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authentication";
import classnames from "classnames";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  }

  handleForgot(e) {
    e.preventDefault();
    console.log("clicked");
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h2 style={{ marginBottom: "40px" }}>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.email
              })}
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.password
              })}
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Login User
            </button>
          </div>
        </form>
        {/* <div onClick={this.handleForgot}>Forgot Password?</div> */}
        <Link to="/Forgot_Password">Forgot Password?</Link>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
