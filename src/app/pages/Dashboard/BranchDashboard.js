import React from "react";

function BranchDashboard(props){
    return(
        <React.Fragment>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <h4>Card-1</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <h4>Card-2</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <h4>Card-3</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <h4>Card-4</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default BranchDashboard;