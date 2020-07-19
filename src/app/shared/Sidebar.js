import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { Collapse } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import isAllowed from "../utils/accessControl";
import {ACTION_VIEW } from "../utils/accessControl";
import {
        MODULE_BRANCH,
        MODULE_USER,
        MODULE_ROLE,
        //MODULE_TRANSFER,
        MODULE_INVENTORY,
        MODULE_AUDITLOG,
        MODULE_TRANSACTION } from "../utils/accessControl";

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));

  }
  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <a className="sidebar-brand brand-logo" href="/"><img src={require("../../assets/images/logo.svg")} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini pt-3" href="/"><img src={require("../../assets/images/logo-mini.svg" )} alt="logo" /></a>
        </div>
        <ul className="nav">
          <li className="nav-item nav-profile not-navigation-link">
            <div className="nav-link">
              <Dropdown>
                <Dropdown.Toggle className="nav-link user-switch-dropdown-toggler p-0 toggle-arrow-hide bg-transparent border-0 w-100">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="profile-image">
                      <img src={ require("../../assets/images/faces/face8.jpg")} alt="profile" />
                    </div>
                    <div className="text-left ml-3">
                      <p className="profile-name">Vinayak Phal</p>
                      <small className="designation text-muted text-small">Manager</small>
                      <span className="status-indicator online"></span>
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown">
                  <Dropdown.Item className="dropdown-item p-0 preview-item d-flex align-items-center" href="!#" onClick={evt =>evt.preventDefault()}>
                    <div className="d-flex">
                      <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                        <i className="mdi mdi-bookmark-plus-outline mr-0"></i>
                      </div>
                      <div className="py-3 px-4 d-flex align-items-center justify-content-center border-left border-right">
                        <i className="mdi mdi-account-outline mr-0"></i>
                      </div>
                      <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                        <i className="mdi mdi-alarm-check mr-0"></i>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small" onClick={evt =>evt.preventDefault()}>
                    Manage Accounts
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small" onClick={evt =>evt.preventDefault()}>
                  Change Password
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small" onClick={evt =>evt.preventDefault()}>
                    Check Inbox
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small" onClick={evt =>evt.preventDefault()}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <button className="btn btn-success btn-block">New Project <i className="mdi mdi-plus"></i></button>
            </div>
          </li>
          <li className={ this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/dashboard">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title">Dashboard</span>
            </Link>
          </li>
          {isAllowed(ACTION_VIEW, MODULE_INVENTORY) &&
          <li className={ this.isPathActive('/categories') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/categories">
              <i className="mdi mdi-table-large menu-icon"></i>
              <span className="menu-title">Categories</span>
            </Link>
          </li>
          }
          {isAllowed(ACTION_VIEW, MODULE_BRANCH) &&
          <li className={ this.isPathActive('/branches') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/branches">
              <i className="mdi mdi-table-large menu-icon"></i>
              <span className="menu-title">Branches</span>
            </Link>
          </li>
          }
          {isAllowed(ACTION_VIEW, MODULE_ROLE) &&
          <li className={ this.isPathActive('/roles') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/roles">
              <i className="mdi mdi-table-large menu-icon"></i>
              <span className="menu-title">Roles</span>
            </Link>
          </li>
          }
          {isAllowed(ACTION_VIEW, MODULE_INVENTORY) &&
          <li className={ this.isPathActive('/inventory') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/inventory">
              <i className="mdi mdi-table-large menu-icon"></i>
              <span className="menu-title">Inventory</span>
            </Link>
          </li>
          }
          {isAllowed(ACTION_VIEW, MODULE_USER) &&
          <li className={ this.isPathActive('/users') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/users">
              <i className="mdi mdi-table-large menu-icon"></i>
              <span className="menu-title">Users</span>
            </Link>
          </li>
          }
          {isAllowed(ACTION_VIEW, MODULE_INVENTORY) &&
          <li className={ this.isPathActive('/units') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/units">
              <i className="mdi mdi-table-large menu-icon"></i>
              <span className="menu-title">Units</span>
            </Link>
          </li>
          }
          {isAllowed(ACTION_VIEW, MODULE_INVENTORY) &&
            <li className={ this.isPathActive('/products') ? 'nav-item active' : 'nav-item' }>
              <Link className="nav-link" to="/products">
                <i className="mdi mdi-table-large menu-icon"></i>
                <span className="menu-title">Products</span>
              </Link>
            </li>
          }
          {isAllowed(ACTION_VIEW, MODULE_TRANSACTION) &&
            <li className={ this.isPathActive('/transactions') ? 'nav-item active' : 'nav-item' }>
              <Link className="nav-link" to="/transactions">
                <i className="mdi mdi-table-large menu-icon"></i>
                <span className="menu-title">Transactions</span>
              </Link>
            </li>
          }
          {isAllowed(ACTION_VIEW, MODULE_AUDITLOG) &&
            <li className={ this.isPathActive('/audits') ? 'nav-item active' : 'nav-item' }>
              <Link className="nav-link" to="/audits">
                <i className="mdi mdi-table-large menu-icon"></i>
                <span className="menu-title">Audits</span>
              </Link>
            </li>
          }
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);