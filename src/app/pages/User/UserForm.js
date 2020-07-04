import React from "react";
import {connect} from "react-redux";
import {Form} from "react-bootstrap";
import Select from 'react-select';
import {getDropdownItem, getSelectedItem} from '../../utils/dropDownUtils'

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
            email: ""
        }
    }

    componentDidMount(){
        this.setState({...this.props.record});
    }

    handleChange = evt => {
        this.setState({
            ...this.state,
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
            ...this.state,
            [field]: evt.value
        })
    }

    onSubmit = event => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            this.props.onSubmit({...this.state});
        }
    }

    render() {
        return(
            <form className="forms-sample" onSubmit={this.onSubmit} >
                <div className="pl-3 pr-3">
                    <Form.Group>
                        <label htmlFor="name">First Name</label>
                        <Form.Control required type="text" className="form-control" id="userFirstName" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please enter first name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="name">Last Name</label>
                        <Form.Control required type="text" className="form-control" id="userLastName" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please enter last name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="name">Email Address</label>
                        <Form.Control required type="email" className="form-control" id="userEmail" name="email" placeholder="E Mail" value={this.state.email} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please enter valid email address</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Role</label>
                        <Select className="basic-single" classNamePrefix="select" value={getSelectedItem(this.props.roleDropDownArr, this.state.role)}
                            options={this.props.roleDropDownArr} onChange={(e)=>{this.handleDropDown('role', e)}}/>
                        <Form.Control.Feedback type="invalid">Please select role</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Branch</label>
                        <Select className="basic-single" classNamePrefix="select" value={getSelectedItem(this.props.branchDropDownArr, this.state.branch)}
                            options={this.props.branchDropDownArr} onChange={(e)=>{this.handleDropDown('branch', e)}}/>
                        <Form.Control.Feedback type="invalid">Please select branch</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="isActive">User Status</label>
                        <Form.Check type="radio" id="categoryIsActive" name="isActive" value="active" label="Active" checked={this.state.isActive} onChange={this.onStatusChange} />
                        <Form.Check type="radio" id="categoryIsInActive" name="isActive" value="inActive" label="In Active" checked={!this.state.isActive} onChange={this.onStatusChange} />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="name">User Contact</label>
                        <Form.Control required type="text" className="form-control" id="userContact" name="contact" placeholder="Contact" value={this.state.contact} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please phone number</Form.Control.Feedback>
                    </Form.Group>
                </div>
                <hr className="modal-footer-ruler" />
                <div className="text-right">
                    <button type="button" className="btn btn-light mr-2" onClick={this.props.closeModal}>Cancel</button>
                    <button type="submit" className="btn btn-primary">{this.props.label}</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    const roleDropDownArr = state.ROLE.allRoles.map(role => getDropdownItem(role.name, role.id));
    const branchDropDownArr = state.BRANCHES.allRecords.map(branch => getDropdownItem(branch.branch, branch.branch));
    return{
        roleDropDownArr,
        branchDropDownArr
    }
}

export default connect(mapStateToProps, null)(UserForm);