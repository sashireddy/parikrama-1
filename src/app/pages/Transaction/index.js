import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import DatePicker from "react-datepicker";
import { Form } from "react-bootstrap";
import Select from 'react-select';
import TransactionListItem from "./TransactionListItem";
import Spinner from "../../shared/Spinner";
import transactionActions from "../../actions/transactionActions";
import {getSelectedItem, dropDownResponseFromMap} from '../../utils/dropDownUtils';


class Transaction extends React.Component {
    constructor(){
        super()
        this.state = {
            branch: "",
            startDate: "",
            endDate: "",
            email: "",
            errorMsg: ""
        }
    }

    loadData() {
        const params = {
            branch: this.state.branch,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            email: this.state.email
        };
        this.props.getTransactions(params);
    }

    setDate = (field, date) => {
        this.setState({
            [field]: date
        });
    }

    handleDropDown = (field, evt) => {
        this.setState({
            [field]: evt ? evt.value : ""
        });
    }

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    componentDidMount(){
        this.setState({
                startDate: this.props.startDate,
                endDate: this.props.endDate,
                email: this.props.email,
                branch: this.props.branch
            },
            this.loadData
        );
    }

    onSubmit = evt => {
        evt.preventDefault();
        const {startDate, endDate} = this.state;
        // Both are present or both are empty then only search
        if(this.isParmasChanged()) {
            if(((startDate && endDate) || (!startDate && !endDate))){
                this.setState({errorMsg: ""});
                this.loadData();
            } else {
                this.setState({errorMsg: "Both Start date and End date are needs to be selected or removed."});
            }
        } else {
            this.setState({errorMsg: "Filter parameters not changed"});
        }
    }

    resetFilter = () => {
        this.setState({
            startDate: null,
            endDate: null,
            email: "",
            branch: this.props.branch
        });
    }

    isParmasChanged = () => {
        return !(this.props.startDate === this.state.startDate
            && this.props.endDate === this.state.endDate
            && this.props.email === this.state.email
            && this.props.branch === this.state.branch);
    }

    render(){
        return(
            <div>
                <Spinner loading={this.props.loading} />
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
                                <Form className="custom-page-filter" onSubmit={this.onSubmit}>
                                        <Form.Group>
                                            <Form.Label>Start Date</Form.Label>
                                            <DatePicker
                                                dateFormat="yyyy-MM-dd"
                                                selected={this.state.startDate}
                                                onChange={date => this.setDate('startDate', date)}
                                                selectsStart
                                                startDate={this.state.startDate}
                                                endDate={this.state.endDate}
                                                maxDate={this.state.endDate}
                                                className="form-control"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>End Date</Form.Label>
                                            <DatePicker
                                                dateFormat="yyyy-MM-dd"
                                                selected={this.state.endDate}
                                                onChange={date => this.setDate('endDate', date)}
                                                selectsEnd
                                                startDate={this.state.startDate}
                                                endDate={this.state.endDate}
                                                minDate={this.state.startDate}
                                                className="form-control"
                                            />
                                        </Form.Group>
                                        <Form.Group className="select-box-fix">
                                            <Form.Label>Branch</Form.Label>
                                            <Select className="basic-single" classNamePrefix="select" value={getSelectedItem(this.props.branchDropDownArr, this.state.branch)}
                                                options={this.props.branchDropDownArr} onChange={(e)=>{this.handleDropDown('branch', e)}}
                                                isSearchable placeholder="Select Branch" styles={customStyles}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="text" className="form-control" name="email" placeholder="User Email" value={this.state.email} onChange={this.handleChange}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <input type="submit" value="Search" className="btn btn-primary mr-4"/>
                                            <input type="button" value="Reset" className="btn btn-secondary" onClick={this.resetFilter}/>
                                        </Form.Group>
                                </Form>
                                {this.state.errorMsg.trim() ? <p className="text-warning">{this.state.errorMsg}</p> : null}
                                {this.props.data.length ?
                                    <ul className="timeline">
                                        {this.props.data.map(txn => <TransactionListItem txn={txn} key={txn.transactionId} />)}
                                    </ul>
                                : <p className="text-center text-info">No Transactions logs found, try changing the filter.</p> }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    const branchDropDownArr = dropDownResponseFromMap(state.BRANCHES.allRecords);
    return {
        branchDropDownArr,
        ...state["TRANSACTION"]
    }
};

const mapActionToProps = {
    ...transactionActions
};

const customStyles = {
    control: base => ({
      ...base,
      height: 45
    })
};

export default connect(mapStateToProps, mapActionToProps)(Transaction);