import React, { Component } from 'react';
import Spinner from '../app/shared/Spinner';
import { withRouter} from 'react-router-dom';
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';
import store from './store';
import userActions from './actions/userActions';
import {connect} from 'react-redux'
import {addNotification} from './actions/notification'
import {validateIntialLoad,validateLogginUserLoad} from './utils/dataUtils'
import metadataAction from './actions/metadataAction';
const mapStateToProps = state => ({
  auth : state['AUTH'],
  state
})
const mapActionToProps = {
}
class App extends Component {

  constructor(props) {
    super(props)
    this.state={
    }
  }
  componentDidMount() {
    store.dispatch(userActions.getUserInfo());
    store.dispatch(metadataAction.getAllMetadata());
    addNotification({
      title:'Welcome',
      message : 'Welcome to parikrama Inventory Management ',
      type:'success'
    })
    this.onRouteChanged();
  }
  render () {

    const loading = validateIntialLoad(this.props.state.BRANCHES) && validateIntialLoad(this.props.state.CATEGORY)
                  && validateIntialLoad(this.props.state.USER) && validateLogginUserLoad(this.props.state.USER)
                  && validateIntialLoad(this.props.state.PRODUCTS) && validateIntialLoad(this.props.state.UNITS);
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar/> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar/> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
    return (

        <div className="container-scroller">
          <ReactNotification />
          {navbarComponent }
          <div className="container-fluid page-body-wrapper">
            { sidebarComponent }
            <div className="main-panel">
              <div className="content-wrapper">
                {!loading && <Spinner loading/> }
                {loading && <AppRoutes/> }
              </div>
              { footerComponent }
            </div>
          </div>
        </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    // console.log("ROUTE CHANGED");
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/user-pages/login-1', '/user-pages/login-2', '/user-pages/register-1', '/user-pages/register-2', '/user-pages/lockscreen', '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page'];
    for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
  }

}

export default connect(mapStateToProps, mapActionToProps)(withRouter(App))
