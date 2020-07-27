import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import DatePicker from "react-datepicker";
import { Form } from "react-bootstrap";
import AuditListItem from "./AuditListItem";
import Spinner from "../../shared/Spinner";
import auditActions from "../../actions/auditActions";


class Audit extends React.Component {
    constructor(){
        super()
        this.state = {
            startDate: "",
            endDate: "",
            email: "",
            errorMsg: ""
        }
    }

    loadData = dir => {
        const params = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            email: this.state.email,
            nextPageToken: this.props.nextPageToken,
            prevPageToken: this.props.prevPageToken,
            dir: dir
        };
        this.props.getAudits(params);
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
                email: this.props.email
            },
            () => {
                if(this.props.data.length === 0){
                    this.loadData()
                }
            }
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
                this.setState({errorMsg: "Both Start Date and End Date are needed to be selected or removed."});
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
            branch: this.props.userBranch
        }, this.loadData);
    }

    isParmasChanged = () => {
        return !(this.props.startDate === this.state.startDate
            && this.props.endDate === this.state.endDate
            && this.props.email === this.state.email);
    }

    render(){
        return(
            <div className="audits">
                <Spinner loading={this.props.loading} />
                <div className="page-header">
                    <h3 className="page-title"> Audits </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Audits
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
                                                maxDate={this.state.endDate || new Date()}
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
                                                maxDate={new Date()}
                                                className="form-control"
                                            />
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
                                        {this.props.data.map(txn => <AuditListItem txn={txn} key={txn.id} />)}
                                    </ul>
                                : <p className="text-center text-info">No Audit logs found, try changing the filter.</p> }
                                <div className="text-center">
                                    {<button className="btn btn-primary active mr-4" disabled={!this.props.prevPageToken} onClick={() => this.loadData("prev")}><i className="mr-1 fa fa-chevron-left"></i>Previous</button>}
                                    {<button className="btn btn-primary active" disabled={!this.props.nextPageToken} onClick={() => this.loadData("next")}>Next <i className="ml-1 fa fa-chevron-right"></i></button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ...state["AUDIT"]
    }
};

const mapActionToProps = {
    ...auditActions
};


export default connect(mapStateToProps, mapActionToProps)(Audit);