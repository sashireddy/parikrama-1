import React from "react";
import {connect} from "react-redux";
import {Form} from "react-bootstrap";
import Select from 'react-select';
import {getSelectedItem, dropDownResponseFromMap} from '../../utils/dropDownUtils';

class UserForm extends React.Component {
    constructor(){
        super();
        this.state = {
            firstName: "",
            role: "",
            isActive: true,
            branch: "",
            contact: "",
            lastName: "",
            email: "",
            password: "",
            showPassword: false,
        }
    }

    componentDidMount(){
        this.setState({...this.props.record});
    }

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    onStatusChange = evt => {
        this.setState({
            isActive: evt.target.value === "active"
        });
    }

    handleDropDown = (field, evt) => {
        this.setState({
            [field]: evt ? evt.value : ""
        });
    }

    toggleShowPassword = event => {
        event.preventDefault();
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    onSubmit = event => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            this.props.onSubmit({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                isActive: this.state.isActive,
                branch: this.state.branch,
                role: this.state.role,
                contact: this.state.contact
            });
        }
        this.setState({validated: true});
    }

    render() {
        const isUpdate = !!this.props.record;
        return(
            <Form noValidate validated={this.state.validated} onSubmit={this.onSubmit}>
                <div className="pl-3 pr-3">
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control required type="text" id="userFirstName" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please enter first name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control required type="text" id="userLastName" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please enter last name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control required type="text" className="form-control" id="userEmail" name="email" placeholder="E Mail" value={this.state.email} onChange={this.handleChange} readOnly={isUpdate} pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}" />
                        <Form.Control.Feedback type="invalid">Please enter valid email address</Form.Control.Feedback>
                    </Form.Group>
                    {!isUpdate ?
                        <Form.Group>
                            <label htmlFor="name">User Password</label>
                            <em className="d-block"><small>Create a password for user to login for the first time.</small></em>
                            <div className="input-group">
                                <Form.Control required type={this.state.showPassword ? "text" : "password"} className="form-control" id="userPassword" name="password" placeholder="User Password" value={this.state.password} onChange={this.handleChange} minLength="6" />
                                <div className="input-group-append">
                                    <button className="btn btn-sm btn-primary" type="button" onClick={this.toggleShowPassword}>
                                        {this.state.showPassword ? <i className="fa fa-eye" /> : <i className="fa fa-eye-slash" /> }
                                    </button>
                                </div>
                                <Form.Control.Feedback type="invalid">Please enter minimum 6 character password</Form.Control.Feedback>
                            </div>
                        </Form.Group>
                    : null }
                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Control required type="text" value={this.state.role} className="d-none" onChange={()=>{}}/>
                        <Select required className="basic-single" classNamePrefix="select" value={getSelectedItem(this.props.roleDropDownArr, this.state.role)}
                            options={this.props.roleDropDownArr} onChange={(e)=>{this.handleDropDown('role', e)}}
                            isClearable isSearchable placeholder="Select Role"/>
                        <Form.Control.Feedback type="invalid">Please select role for the user</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Branch</Form.Label>
                        <Form.Control required type="text" value={this.state.branch} className="d-none" onChange={()=>{}}/>
                        <Select className="basic-single" classNamePrefix="select" value={getSelectedItem(this.props.branchDropDownArr, this.state.branch)}
                            options={this.props.branchDropDownArr} onChange={(e)=>{this.handleDropDown('branch', e)}}
                            isClearable isSearchable placeholder="Select Branch"/>
                        <Form.Control.Feedback type="invalid">Please select branch for the user</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>User Contact</Form.Label>
                        <Form.Control required type="text" className="form-control" id="userContact" name="contact" placeholder="Contact" value={this.state.contact} onChange={this.handleChange}
                        pattern="\d{10}" title="Please enter 10 digits mobile number" />
                        <em><small>Please enter 10 digits mobile number</small></em>
                        <Form.Control.Feedback type="invalid">Please enter valid phone number</Form.Control.Feedback>
                    </Form.Group>
                </div>
                <hr className="modal-footer-ruler" />
                <div className="text-right">
                    <button type="button" className="btn btn-light mr-2" onClick={this.props.closeModal}>Cancel</button>
                    <button type="submit" className="btn btn-primary">{this.props.label}</button>
                </div>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    const roleDropDownArr = dropDownResponseFromMap(state.ROLE.allRecords);
    const branchDropDownArr = dropDownResponseFromMap(state.BRANCHES.allRecords);
    return{
        roleDropDownArr,
        branchDropDownArr
    }
}

export default connect(mapStateToProps, null)(UserForm);