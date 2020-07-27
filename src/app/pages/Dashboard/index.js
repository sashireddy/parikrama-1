import React from "react";
import {connect} from "react-redux";
import dateformat from "dateformat";
import Spinner from "../../shared/Spinner";
import {getBranch, getProduct, getUnit, getOperation, getProductCount, getBranchCount, getCategoryCount} from '../../utils/dataUtils';

import dashboardAction from "../../actions/dashboardActions";

class Dashboard extends React.PureComponent {
    constructor(){
        super();
        this.state = {
            activeBranch: null
        }
    }
    componentDidMount(){
        const activeBranch = this.props.currentUser ? this.props.currentUser.branch : null;
        this.setState({activeBranch});
        if(Object.keys(this.props.dashboardData).length === 0){
            this.props.getDashboardData();
        }
    }

    getBranchWithBelowThreashold() {
        let {dashboardData} = this.props;
        let branchBelowThreashold = [];
        let hasProductsBelowThreashold = false;
        Object.keys(this.props.dashboardData).forEach(key => {
            let products = [];
            dashboardData[key].productsBelowThreshold.forEach(product => {
                products.push({
                    branch: getBranch(key).name,
                    product: getProduct(product.product).name,
                    unit: getUnit(product.unit).name,
                    threshold: product.threshold,
                    availableQuantity: product.availableQuantity
                });
                hasProductsBelowThreashold = true;
            });
            branchBelowThreashold.push({
                "branch": getBranch(key).name,
                "products": products
            });
        });
        if(hasProductsBelowThreashold){
            return branchBelowThreashold.sort((b1,b2) => b2.products.length - b1.products.length);
        } else {
            return false;
        }
    }

    getPendingRequests() {
        let {dashboardData} = this.props;
        let pendingRequests = [];
        let hasPendingRequests = false;
        Object.keys(this.props.dashboardData).forEach(key => {
            let requests = [];
            dashboardData[key].pendingRequests.forEach(product => {
                requests.push({
                    product:product.productName,
                    user: product.user,
                    quantity: product.operationalQuantity,
                    date: dateformat(product.date, "yyyy-mm-dd HH:MM")
                });
                hasPendingRequests = true;
            });
            pendingRequests.push({
                "branch": getBranch(key).name,
                "products": requests.sort((p1, p2) => p2.date - p1.date)
            });
        });
        if(hasPendingRequests){
            return pendingRequests.sort((b1,b2) => b2.products.length - b1.products.length);
        } else {
            return false;
        }
    }

    getRecentActivities() {
        let {dashboardData} = this.props;
        let recentActivities = [];
        let hasActivity = false;
        Object.keys(this.props.dashboardData).forEach(key => {
            let activities = [];
            dashboardData[key].recentActivity.forEach((activity, index) => {
                if(index < 5){
                    activities.push({
                        product:activity.productName,
                        user: activity.user,
                        quantity: activity.operationalQuantity,
                        operation: getOperation(activity.operation).label,
                        date: dateformat(activity.date, "yyyy-mm-dd HH:MM")
                    });
                    hasActivity = true;
                }
            });
            recentActivities.push({
                "branch": getBranch(key).name,
                "activities": activities.sort((p1, p2) => p2.date - p1.date)
            });
        });
        console.log(recentActivities);
        if(hasActivity){
            return recentActivities.sort((b1,b2) => b2.activities.length - b1.activities.length);
        } else {
            return false;
        }
    }

    render(){
        const branchBelowThreashold = this.getBranchWithBelowThreashold();
        const pendingRequests = this.getPendingRequests();
        const recentActivities = this.getRecentActivities();
        return(
            <div className="dashboard">
                <Spinner loading={this.props.loading} />
                <div className="row mb-4 d-none d-sm-flex">
                    <div className="col-lg-3 col-sm-4 grid-margin stretch-card">
                        <div className="card card-statistics">
                            <div className="card-body">
                                <div className="clearfix">
                                    <div className="float-left">
                                        <i className="mdi mdi-flower text-danger icon-lg"></i>
                                    </div>
                                    <div className="float-right">
                                        <p className="mb-0 text-right text-dark">Total Produts</p>
                                        <div className="fluid-container">
                                        <h3 className="font-weight-medium text-right mb-0 text-dark">{getProductCount()}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-4 grid-margin stretch-card">
                        <div className="card card-statistics">
                            <div className="card-body">
                                <div className="clearfix">
                                    <div className="float-left">
                                        <i className="mdi mdi-source-branch text-warning icon-lg"></i>
                                    </div>
                                    <div className="float-right">
                                        <p className="mb-0 text-right text-dark">Total Branches</p>
                                        <div className="fluid-container">
                                            <h3 className="font-weight-medium text-right mb-0 text-dark">{getBranchCount()}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-4 grid-margin stretch-card">
                        <div className="card card-statistics">
                            <div className="card-body">
                                <div className="clearfix">
                                    <div className="float-left">
                                        <i className="mdi mdi-shape-plus text-info icon-lg"></i>
                                    </div>
                                    <div className="float-right">
                                        <p className="mb-0 text-right text-dark">Total Categories</p>
                                        <div className="fluid-container">
                                            <h3 className="font-weight-medium text-right mb-0 text-dark">{getCategoryCount()}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-columns">
                    {/* Card-1 Begins here */}
                    <div className="card card-accent-info">
                        <div className="card-body">
                            <div className="row">
                                <h5 className="w-100">Inventory Below Threshold</h5>
                                {branchBelowThreashold && branchBelowThreashold.map(branch => {
                                    return branch.products.length ?
                                        <React.Fragment key={branch.branch}>
                                            <h6 className="mt-3">Branch : {branch.branch}</h6>
                                            <div className="table-responsive">
                                                <table className="table table-striped table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Product</th>
                                                            <th>Quantity</th>
                                                            <th>Threshold</th>
                                                            <th>Unit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {branch.products.map((product, index) => {
                                                            return (<tr key={`${product.branch}-${product.product}`}>
                                                                <td>{product.product}</td>
                                                                <td>{product.availableQuantity}</td>
                                                                <td>{product.threshold}</td>
                                                                <td>{product.unit}</td>
                                                            </tr>);
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </React.Fragment>
                                    : null;
                                })}
                                {!this.props.loading && !branchBelowThreashold && <p className="h6 text-center w-100 mb-5 mt-5">Hurrey!! No products below threshold</p>}
                            </div>
                        </div>
                    </div>
                    {/* Card-1 Ends here */}

                    {/* Card-2 Begins here */}
                    <div className="card card-accent-info">
                        <div className="card-body">
                            <div className="row">
                                <h5 className="w-100">Pending Requests</h5>
                                {pendingRequests && pendingRequests.map(branch => {
                                    return branch.products.length ?
                                        <React.Fragment key={branch.branch}>
                                            <h6 className="mt-3">Branch : {branch.branch}</h6>
                                            <div className="table-responsive">
                                                <table className="table table-striped table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Product</th>
                                                            <th>Quantity</th>
                                                            <th>User</th>
                                                            <th>Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {branch.products.map((product, index) => {
                                                            return (<tr key={`${product.branch}-${product.product}`}>
                                                                <td>{product.product}</td>
                                                                <td>{product.quantity}</td>
                                                                <td>{product.user}</td>
                                                                <td>{product.date}</td>
                                                            </tr>);
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </React.Fragment>
                                    : null;
                                })}
                                {!this.props.loading && !pendingRequests && <p className="h6 text-center w-100 mb-5 mt-5">Hurrey!! No rending requests</p>}
                            </div>
                        </div>
                    </div>
                    {/* Card-2 Begins here */}

                    {/* Card-3 Begins here */}
                    <div className="card card-accent-info">
                        <div className="card-body">
                            <h5 className="w-100">Recent Transaction Logs</h5>
                            {recentActivities && recentActivities.map(branch => {
                                return branch.activities.length ?
                                    <React.Fragment key={branch.branch}>
                                        <h6 className="mt-3">Branch : {branch.branch}</h6>
                                        <div className="table-responsive">
                                            <table className="table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>User</th>
                                                        <th>Quantity</th>
                                                        <th>Operation</th>
                                                        <th>Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {branch.activities.map((activity, index) => {
                                                        return (<tr key={`${activity.branch}-${index}`}>
                                                            <td>{activity.product}</td>
                                                            <td>{activity.user}</td>
                                                            <td>{activity.quantity}</td>
                                                            <td>{activity.operation}</td>
                                                            <td>{activity.date}</td>
                                                        </tr>);
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </React.Fragment>
                                : null;
                            })}
                            {!this.props.loading && !recentActivities && <p className="h6 text-center w-100 mb-5 mt-5">No Activity logs</p>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state["DASHBOARD"],
    currentUser: state["USER"].loggedInUser
});

const mapActionToProps = {
    ...dashboardAction
};

export default connect(mapStateToProps, mapActionToProps)(Dashboard);