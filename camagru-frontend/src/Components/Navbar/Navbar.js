import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authentication";
import { withRouter } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 0.5
    backgroundColor: "#5cdb95"
  },
  rootColor: {
    backgroundColor: "#5cdb95"
  },
  menuButton: {
    color: "#05386b"
    // marginRight: theme.spacing(2)
    // float: "left"
  },
  title: {
    textAlign: "left",
    marginLeft: "12px",
    marginTop: "5px",
    fontWeight: 600,
    color: "#05386b"
    // flexGrow: 1
  },
  Buttons: {
    textAlign: "end",
    color: "#05386b"
  }
}));

function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.rootColor}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            // color="inherit"
            id="toolBar"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h6" className={classes.title}>
                Camagru
              </Typography>
            </Grid>
            <Grid item xs={8} className={classes.Buttons} id="toolBar">
              <div>
                <IconButton
                  aria-controls="menu-appbar"
                  className={classes.menuButton}
                  id="toolBar"
                  // edge="end"
                  aria-haspopup="true"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  // id="menu-appbar"
                  id="toolBar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={handleClose}
                  // style={{ width: "90%" }}
                >
                  <Button href="/login" id="centerButton">
                    login
                  </Button>
                  <Button href="/register" id="centerButton">
                    Sign up
                  </Button>
                </Menu>
              </div>
            </Grid>
            <Grid item xs={8} className={classes.Buttons} id="ButtonGrid">
              <Button color="inherit" href="/login">
                Login
              </Button>
              <Button color="inherit" href="/register">
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* <Navbar bg="#05386b" expand="lg">
        <Navbar.Brand href="#home">Camagru</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="justify-content-end" id="navAlign">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar> */}
    </div>
  );
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(NavBar));
// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authentication";
// import { withRouter } from "react-router-dom";

// class Navbar extends Component {
//   onLogout(e) {
//     e.preventDefault();
//     this.props.logoutUser(this.props.history);
//   }

//   render() {
//     const { isAuthenticated, user } = this.props.auth;
//     const authLinks = (
//       <ul className="navbar-nav ml-auto">
//         <a href="#" className="nav-link" onClick={this.onLogout.bind(this)}>
//           <img
//             src={user.avatar}
//             alt={user.name}
//             title={user.name}
//             className="rounded-circle"
//             style={{ width: "25px", marginRight: "5px" }}
//           />
//           Logout
//         </a>
//       </ul>
//     );
//     const guestLinks = (
//       <ul className="navbar-nav ml-auto">
//         <li className="nav-item">
//           <Link className="nav-link" to="/register">
//             Sign Up
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/login">
//             Sign In
//           </Link>
//         </li>
//       </ul>
//     );
//     return (
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <Link className="navbar-brand" to="/">
//           Redux Node Auth
//         </Link>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           {isAuthenticated ? authLinks : guestLinks}
//         </div>
//       </nav>
//     );
//   }
// }
// Navbar.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
