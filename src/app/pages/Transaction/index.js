import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import transactionActions from "../../actions/transactionActions";

class Transaction extends React.Component {
    constructor(){
        super()
        this.state = {
            showModal: false,
            currentRecord: null,
            actionType: null,
            sort:{},
            search: {},
            currentPage: 1
        }
    }

    loadData() {
        const params = {
            "currentPage": this.state.currentPage,
            "pageLimit": this.props.pageLimit,
            "search": this.state.search,
            "sort":this.state.sort
        };
        this.props.getTransactions(params);
    }

    componentDidMount(){
        this.setState({
                sort: this.props.sort,
                search: this.props.search,
                currentPage: this.props.currentPage,
                pageLimit: this.props.pageLimit
            },
            this.loadData()
        );
    }

    render(){
        return(
            <div>
                <div className="page-header">
                    <h3 className="page-title"> Transactions </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Transactions
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h3>Transaction Logs will go here...</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    ...state["TRANSACTION"]
});

const mapActionToProps = {
    ...transactionActions
};

export default connect(mapStateToProps, mapActionToProps)(Transaction);