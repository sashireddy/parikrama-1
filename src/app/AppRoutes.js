import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';
import isAllowed, {ACTION_VIEW, ACTION_GENERATE, ACTION_MANAGE} from "./utils/accessControl";
import {
        MODULE_BRANCH,
        MODULE_USER,
        //MODULE_TRANSFER,
        MODULE_INVENTORY,
        //MODULE_AUDITLOG,
        MODULE_TRANSACTION,
        MODULE_REPORT } from "./utils/accessControl";

// const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const FontAwesome = lazy(() => import('./icons/FontAwesome'));


const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./user-pages/Error404'));
const Error500 = lazy(() => import('./user-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));

const BlankPage = lazy(() => import('./user-pages/BlankPage'));


const Reports = lazy(()=> import('./pages/reports'));
const Branch = lazy(() => import('./pages/Branches'))
const Products = lazy(()=> import('./pages/Products'))
const Inventory = lazy(()=>import('./pages/inventory'))
const Category = lazy(()=> import('./pages/Category'))
const Role = lazy(()=> import('./pages/Role'));
const User = lazy(()=> import('./pages/User'));
const Move = lazy(()=> import ('./pages/Move'));
const Unit = lazy(()=> import('./pages/Units'));
const Transaction = lazy(()=> import ('./pages/Transaction'));
const Dashboard = lazy(()=> import ('./pages/Dashboard'));
const Audit = lazy(()=> import ('./pages/Audit'));
const InventoryReports = lazy(()=> import('./pages/InventorySummary'));

class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/dashboard" component={ Dashboard } />
          {isAllowed(ACTION_VIEW, MODULE_USER) && <Route path="/roles" component={ Role } />}
          {isAllowed(ACTION_VIEW, MODULE_USER) && <Route path="/users" component={ User } />}
          {isAllowed(ACTION_MANAGE, MODULE_INVENTORY) && <Route path="/units" component={ Unit } />}
          {isAllowed(ACTION_MANAGE, MODULE_INVENTORY) && <Route path="/categories" component={ Category } />}
          {isAllowed(ACTION_MANAGE, MODULE_INVENTORY) && <Route path="/products" component={ Products } />}
          {/* {isAllowed(ACTION_VIEW, MODULE_INVENTORY) && <Route path="/inventory" component={Inventory} />} */}
          {isAllowed(ACTION_VIEW, MODULE_INVENTORY) && <Route path="/inventoryreports" component={InventoryReports} />}
          {isAllowed(ACTION_GENERATE, MODULE_REPORT) && <Route path="/reports" component ={ Reports } />}
          {isAllowed(ACTION_VIEW, MODULE_TRANSACTION) && <Route path="/transactions" component ={ Transaction } />}
          {isAllowed(ACTION_VIEW, MODULE_BRANCH) && <Route path="/branches/" component={ Branch } />}
          <Route path="/audits" component={ Audit } />
          <Route path="/inventory" component={Inventory} />
          <Route path="/basic-ui/buttons" component={ Buttons } />
          <Route path="/basic-ui/dropdowns" component={ Dropdowns } />
          <Route path="/basic-ui/typography" component={ Typography } />
          <Route path="/form-Elements/basic-elements" component={ BasicElements } />
          <Route path="/tables/basic-table" component={ BasicTable } />
          <Route path="/user-pages/login-1" component={ Login } />
          <Route path="/user-pages/register-1" component={ Register1 } />
          <Route path="/user-pages/error-404" component={ Error404 } />
          <Route path="/user-pages/error-500" component={ Error500 } />
          <Route path="/user-pages/blank-page" component={ BlankPage } />
          <Route path="/icons/font-awesome" component={ FontAwesome } />
          <Route path="/charts/chart-js" component={ ChartJs } />

          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;