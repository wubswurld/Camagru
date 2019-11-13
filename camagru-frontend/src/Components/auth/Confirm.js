import React, { Component } from "react";
import { ConfirmEmail } from "../../actions/authentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";

class Confirm extends Component {
  constructor() {
    super();
    this.state = {
      token: ""
    };
  }
  componentDidMount() {
    this.setState({ token: this.props.match.params.token });
  }

  componentDidUpdate() {
    ConfirmEmail(this.state.token, this.props.history)
      .then(() => {
        toast("Wow so easy !");
      })
      .catch(() => {
        toast.error("Your account is already verified, please sign in");
        // .then(res => this.props.history.pushState("/login"));
      });
  }
  render() {
    // const { token } = this.props.match.params;
    console.log(this.state.token);
    return (
      <div
        // className="container"
        style={{ marginTop: "300px", width: "700px", display: "inline-block" }}
      >
        <ToastContainer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Confirm);
