import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import Firebase from '../Firebase/firebase';
import {connect} from "react-redux";
import Modal from "./Modal";
import ChangePassword from "../pages/User/ChangePassword";
import { Link, withRouter } from 'react-router-dom';

class Navbar extends Component {

  constructor(){
    super();
    this.state = {
      showModal: false
    }
  }

  changePassword = () => {
    this.setState({
      showModal: true
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false
    });
  }

  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  logout = async () => {
    await Firebase.auth.signOut();
    window.location.href="/";
  }

  isPathActive(path) {
    return this.props.location.pathname === path
  }

  render () {
    const user = this.props.loggedInUser ? this.props.loggedInUser : null;
    return (
      <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
        <a className="navbar-brand brand-logo-mini align-self-center d-lg-none" href="!#" onClick={evt =>evt.preventDefault()}><img className="mobile-logo" src={require("../../assets/images/parikrama-logo-mini.png")} alt="logo" /></a>
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <i className="mdi mdi-menu"></i>
          </button>
          <ul className="navbar-nav navbar-nav-left header-links">
          <li className={this.isPathActive('/inventory') ? "nav-item d-none d-lg-flex active" : "nav-item d-none d-lg-flex"}>
              <Link className="nav-link" to="/inventory">
                <i className="mdi mdi-barley"></i>
                <span>Inventory</span>
              </Link>
            </li>
            <li className={this.isPathActive('/inventoryreports') ? "nav-item d-none d-lg-flex active" : "nav-item d-none d-lg-flex"}>
              <Link className="nav-link" to="/inventoryreports">
                <i className="mdi mdi-attachment"></i>
                <span>Reports</span>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right ml-lg-auto">
            <li className="nav-item  nav-profile border-0">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator bg-transparent">
                  {user && <span className="profile-text">{`${user.firstName} ${user.lastName}`}</span>}
                  <img className="img-xs rounded-circle" src={require("../../assets/images/faces/face8.png")} alt="Profile" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown pb-3">
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2" onClick={this.changePassword}>
                   Change Password
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0" onClick={this.logout}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={this.toggleOffcanvas}>
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
          <Modal title="Change Password"
              show={this.state.showModal}
              closeModal={this.closeModal}>
              <ChangePassword closeModal={this.closeModal}/>
          </Modal>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
      loggedInUser: state.USER.loggedInUser
  }
};

export default connect(mapStateToProps)(withRouter(Navbar));