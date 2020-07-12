import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import DatePicker from "react-datepicker";
import { Form } from "react-bootstrap";
import Select from 'react-select';
import dateFormat from "dateformat";
import inventoryActions from "../../actions/inventoryActions";
import {getSelectedItem, dropDownResponseFromMap} from '../../utils/dropDownUtils';


class Transaction extends React.Component {
    constructor(){
        super()
        this.state = {
            branch: "MxoS2K8t8jT7MATniD4x",
            startDate: "",
            endDate: "",
            error: false
        }
    }

    loadData() {
        const params = {
            branch: this.state.branch,
            startDate: this.state.startDate ? dateFormat(this.state.startDate, "yyyy-mm-dd") : "",
            endDate: this.state.endDate ? dateFormat(this.state.endDate, "yyyy-mm-dd") : "",
        };
        // this.props.getInventory(params);
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
        this.loadData();
    }

    onSubmit = evt => {
        evt.preventDefault();
        const {startDate, endDate} = this.state;
        // Both are present or both are empty then only search
        if((startDate && endDate) || (!startDate && !endDate)){
            this.setState({error: false});
            this.loadData();
        } else {
            this.setState({error: true});
        }


    }

    render(){
        return(
            <div>
                {/* <Spinner loading={this.props.loading} /> */}
                <div className="page-header">
                    <h3 className="page-title"> Inventory Reports </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Inventory</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Inventory
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
                                            <Form.Label>Date</Form.Label>
                                            <DatePicker
                                                dateFormat="yyyy-MM-dd"
                                                selected={this.state.startDate}
                                                onChange={date => this.setDate('startDate', date)}
                                                // selectsStart
                                                startDate={this.state.startDate}
                                                // endDate={this.state.endDate}
                                                // maxDate={this.state.endDate}
                                                className="form-control"
                                            />
                                        </Form.Group>
                                        {/* <Form.Group>
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
                                        </Form.Group> */}
                                        <Form.Group className="select-box-fix">
                                            <Form.Label>Branch</Form.Label>
                                            <Select className="basic-single" classNamePrefix="select" value={getSelectedItem(this.props.branchDropDownArr, this.state.branch)}
                                                options={this.props.branchDropDownArr} onChange={(e)=>{this.handleDropDown('branch', e)}}
                                                isSearchable placeholder="Select Branch" styles={customStyles}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <input type="submit" value="Search" className="btn btn-primary"/>
                                        </Form.Group>
                                </Form>
                                {this.state.error ? <p className="text-warning">Please select both start and end date</p> : null}
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
    ...inventoryActions
};

const customStyles = {
    control: base => ({
      ...base,
      height: 45
    })
};

export default connect(mapStateToProps, mapActionToProps)(Transaction);