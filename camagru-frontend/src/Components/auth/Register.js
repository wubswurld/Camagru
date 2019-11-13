import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authentication";
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import mySvg from "../../assets/photographer-clipart-tripod-3.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import { Card, Form } from "react-bootstrap";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      response: "",
      name: "",
      email: "",
      password: "",
      password_confirm: "",
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
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };
    this.props.registerUser(user, this.props.history).then(res => {
      // console.log(res);
      this.setState({
        response: res
      });
    });
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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    // const useStyles = this.props;
    const { errors } = this.state;
    // const classes = useStyles();
    return (
      <div
        className="container"
        style={{ marginTop: "50px", width: "700px", display: "inline-block" }}
      >
        <div style={{ marginTop: "50px" }}>{this.state.response}</div>
        <Paper id="paper">
          <img className="image" src={mySvg} alt="not here"></img>
          {/* <div className="vl"></div> */}
          <div style={{ float: "left" }}>
            <h2 style={{ marginBottom: "40px", textDecoration: "underline" }}>
              Registration
            </h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextField
                  id="text-field"
                  type="text"
                  placeholder="Name"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.name
                  })}
                  name="name"
                  onChange={this.handleInputChange}
                  value={this.state.name}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <TextField
                  id="text-field2"
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
                <TextField
                  id="text-field2"
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
                <TextField
                  id="text-field2"
                  type="password"
                  placeholder="Confirm Password"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password_confirm
                  })}
                  name="password_confirm"
                  onChange={this.handleInputChange}
                  value={this.state.password_confirm}
                />
                {errors.password_confirm && (
                  <div className="invalid-feedback">
                    {errors.password_confirm}
                  </div>
                )}
              </div>
              <div className="form-group">
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  className="btn btn-primary"
                  id="registerButton"
                >
                  Register User
                </Button>
              </div>
            </form>
          </div>
        </Paper>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
