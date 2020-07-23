import React from "react";
import {connect} from "react-redux";
import {Tabs, Tab} from "react-bootstrap";
import BranchDashboard from "./BranchDashboard";
import {getBranch} from '../../utils/dataUtils';

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
        this.props.getDashboardData();
    }

    render(){
        const {dashboardData} = this.props;
        return(
            <div>
                <p>{this.state.activeBranch} -> {Object.keys(dashboardData).map(key => <span key={key}>{key} | </span>)}</p>
                <Tabs defaultActiveKey={this.state.activeBranch}>
                    {Object.keys(dashboardData).map(branch => (
                        <Tab eventKey={branch} title={getBranch(branch).name} key={branch}>
                            <BranchDashboard dashboardData={dashboardData[branch]}/>
                        </Tab>
                    ))}
                </Tabs>
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