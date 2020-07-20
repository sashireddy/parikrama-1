import React from "react";
import {connect} from "react-redux";

import dashboardAction from "../../actions/dashboardActions";

class Dashboard extends React.PureComponent {
    componentDidMount(){
        this.props.getDashboardData();
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <h1>HELLO Kitty!</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state["DASHBOARD"]
});

const mapActionToProps = {
    ...dashboardAction
};

export default connect(mapStateToProps, mapActionToProps)(Dashboard);