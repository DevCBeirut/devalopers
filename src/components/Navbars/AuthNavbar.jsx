import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

// reactstrap misc
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container
} from "reactstrap";

class AuthNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent"
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }
  // this function opens and closes the collapse on small devices
  // it also adds navbar-transparent class to the navbar when closed
  // ad bg-white when opened
  toggleCollapse = () => {
    let newState = {
      collapseOpen: !this.state.collapseOpen
    };
    if (!this.state.collapseOpen) {
      newState["color"] = "bg-white";
    } else {
      newState["color"] = "navbar-transparent";
    }
    this.setState(newState);
  };
  render() {
    return (
      <Navbar
        className={classnames("navbar-absolute fixed-top", this.state.color)}
        expand="lg"
      >
        <Container>
          <div className="navbar-wrapper">
            <NavbarBrand href="#" onClick={e => e.preventDefault()}>
                Dar Al Zahraa  - Dashboard
            </NavbarBrand>
          </div>
          <button
            aria-controls="navigation-index"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-toggle="collapse"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <Collapse
            isOpen={this.state.collapseOpen}
            className="justify-content-end"
            navbar
          >
            <Nav navbar>
              <NavItem>
                <NavLink to="/admin/dashboard" className="nav-link">
                  <i className="nc-icon nc-layout-11" />
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/auth/register" className="nav-link">
                  <i className="nc-icon nc-book-bookmark" />
                  Register
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/auth/login" className="nav-link">
                  <i className="nc-icon nc-tap-01" />
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/admin/user-profile" className="nav-link">
                  <i className="nc-icon nc-satisfied" />
                  User
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/auth/lock-screen" className="nav-link">
                  <i className="nc-icon nc-key-25" />
                  Lock
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default AuthNavbar;
