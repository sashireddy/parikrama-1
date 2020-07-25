import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { Collapse } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import {connect} from "react-redux";
import {getRole} from '../utils/dataUtils';
import isAllowed, { ACTION_GENERATE,ACTION_MANAGE,MODULE_REPORT } from "../utils/accessControl";
import {ACTION_VIEW } from "../utils/accessControl";
import {
        MODULE_BRANCH,
        MODULE_USER,
        //MODULE_TRANSFER,
        MODULE_INVENTORY,
        MODULE_AUDITLOG,
        MODULE_TRANSACTION } from "../utils/accessControl";

class Sidebar extends React.Component {
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
    const user = this.props.loggedInUser ? this.props.loggedInUser : null;
    const role = user && getRole(user.role) ? getRole(user.role).name : "";
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <a className="sidebar-brand brand-logo" href="/"><img src={require("../../assets/images/parikrama-logo.png")} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini pt-3" href="/"><img src={require("../../assets/images/parikrama-logo-mini.png" )} alt="logo" /></a>
        </div>
        <ul className="nav">
          <li className="nav-item nav-profile not-navigation-link">
            <div className="nav-link">
              <Dropdown>
                <Dropdown.Toggle className="nav-link user-switch-dropdown-toggler p-0 toggle-arrow-hide bg-transparent border-0 w-100">
                  <div className="d-flex justify-content-between align-items-start mb-0">
                    <div className="profile-image">
                      <img src={ require("../../assets/images/faces/face8.png")} alt="profile" />
                    </div>
                    <div className="text-left ml-3">
                      {user && (
                        <React.Fragment>
                        <p className="profile-name">{`${user.firstName} ${user.lastName}`}</p>
                        <small className="designation text-muted text-small">{role}</small>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </Dropdown.Toggle>
              </Dropdown>
            </div>
          </li>
          <li className={ this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/dashboard">
              <i className="mdi mdi-television-guide menu-icon"></i>
              <span className="menu-title">Dashboard</span>
            </Link>
          </li>
          {isAllowed(ACTION_VIEW, MODULE_INVENTORY) &&
          <li className={ this.isPathActive('/categories') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/categories">
              <i className="mdi mdi-shape-plus menu-icon"></i>
              <span className="menu-title">Categories</span>
            </Link>
          </li>
          }
          {isAllowed(ACTION_VIEW, MODULE_BRANCH) &&
          <li className={ this.isPathActive('/branches') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/branches">
              <i className="mdi mdi-source-branch menu-icon"></i>
              <span className="menu-title">Branches</span>
            </Link>
          </li>
          }
          {isAllowed(ACTION_VIEW, MODULE_USER) &&
          <li className={ this.isPathActive('/roles') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/roles">
              <i className="mdi mdi-format-paint menu-icon"></i>
              <span className="menu-title">Roles</span>
            </Link>
          </li>
          }
          {isAllowed(ACTION_VIEW, MODULE_USER) &&
          <li className={ this.isPathActive('/users') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/users">
              <i className="mdi mdi-account-multiple menu-icon"></i>
              <span className="menu-title">Users</span>
            </Link>
          </li>
          }
          {isAllowed(ACTION_VIEW, MODULE_INVENTORY) &&
            <li className={ this.isPathActive('/units') ? 'nav-item active' : 'nav-item' }>
              <Link className="nav-link" to="/units">
                <i className="mdi mdi-unity menu-icon"></i>
                <span className="menu-title">Units</span>
              </Link>
            </li>
          }
          {isAllowed(ACTION_VIEW, MODULE_INVENTORY) &&
            <li className={ this.isPathActive('/products') ? 'nav-item active' : 'nav-item' }>
              <Link className="nav-link" to="/products">
                <i className="mdi mdi-flower menu-icon"></i>
                <span className="menu-title">Products</span>
              </Link>
            </li>
          }
          <li className={ this.isPathActive('/inventory') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/inventory">
              <i className="mdi mdi-barley menu-icon"></i>
              <span className="menu-title">Inventory</span>
            </Link>
          </li>
          {/* } */}
          { isAllowed(ACTION_MANAGE,MODULE_INVENTORY) &&
            <li className={ this.isPathActive('/inventoryreports') ? 'nav-item active' : 'nav-item' }>
              <Link className="nav-link" to="/inventoryreports">
                <i className="mdi mdi-attachment menu-icon"></i>
                <span className="menu-title">Inventory Summary Report</span>
              </Link>
            </li>
          }
          {isAllowed(ACTION_VIEW, MODULE_TRANSACTION) &&
            <li className={ this.isPathActive('/transactions') ? 'nav-item active' : 'nav-item' }>
              <Link className="nav-link" to="/transactions">
                <i className="mdi mdi-message-text menu-icon"></i>
                <span className="menu-title">Transactions</span>
              </Link>
            </li>
          }
          {isAllowed(ACTION_VIEW, MODULE_AUDITLOG) &&
            <li className={ this.isPathActive('/audits') ? 'nav-item active' : 'nav-item' }>
              <Link className="nav-link" to="/audits">
                <i className="mdi mdi-message-alert menu-icon"></i>
                <span className="menu-title">Audits</span>
              </Link>
            </li>
          }
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname === path
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
const mapStateToProps = state => {
  return {
      loggedInUser: state.USER.loggedInUser,
      roles: state.ROLE
  }
};

export default connect(mapStateToProps)(withRouter(Sidebar));