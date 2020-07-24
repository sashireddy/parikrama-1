import React from "react";
import {Form} from "react-bootstrap";
import {connect} from "react-redux";

class BranchForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isActive : true,
            isHeadOffice : false,
            ...this.props.record,
        }
        if(!this.state.address) {
            this.state.address = {}
        }
    }

    componentDidMount(){
        this.setState({...this.props.record});
    }

    handleBranchChange = evt => {
        const input = evt.target;
        const value = input.value;
        if(this.props.branches.includes(value.toUpperCase())){
            input.setCustomValidity("Branch already exists");
        } else {
            input.setCustomValidity("");
        }
        this.setState({
            ...this.state,
            name: value
        });

    }

    handleChange = evt => {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
        });
    }

    onSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            let payload = {...this.state}
            payload.address.zipcode = parseInt(payload.address.zipcode);
            this.props.onSubmit(payload);
        }
        this.setState({validated: true});
    }

    onStatusChange = (evt,attr) => {
        this.setState({
            [attr]: evt.target.value === "active"
        });
    }

    handleAddressChange = event => {
        this.setState({
            ...this.state,
            address: {
                ...this.state.address,
                [event.target.name]: event.target.value
            }
        })
    }

    render() {
        console.log(this.state)
        return(
            <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={this.onSubmit} >
                <div className="pl-3 pr-3">
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Branch Name</label>
                        <Form.Control required type="text" className="form-control" id="branchName" name="name" placeholder="Branch Name" value={this.state.name} onChange={this.handleBranchChange} />
                        <Form.Control.Feedback type="invalid">Please enter unique branch name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="isHeadOffice">Branch Type</label>
                        <Form.Check type="radio" id="isHeadOffice" name="isHeadOffice" value="active" label="Head Office" checked={this.state.isHeadOffice} onChange={e=>this.onStatusChange(e,"isHeadOffice")} />
                        <Form.Check type="radio" id="isBranchOffice" name="isHeadOffice" value="inActive" label="Branch Office" checked={!this.state.isHeadOffice} onChange={e=>this.onStatusChange(e,"isHeadOffice")} />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Street</label>
                        <Form.Control required type="text" className="form-control" id="Street" name="street" placeholder="Street Name" value={getFallbackIfEmpty(this.state.address.street)} onChange={this.handleAddressChange} />
                        <Form.Control.Feedback type="invalid">Please enter street name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">City</label>
                        <Form.Control required type="text" className="form-control" id="City" name="city" placeholder="City Name" value={getFallbackIfEmpty(this.state.address.city)} onChange={this.handleAddressChange} />
                        <Form.Control.Feedback type="invalid">Please enter street name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">State</label>
                        <Form.Control required type="text" className="form-control" id="State" name="state" placeholder="State Name" value={getFallbackIfEmpty(this.state.address.state)} onChange={this.handleAddressChange} />
                        <Form.Control.Feedback type="invalid">Please enter state name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Country</label>
                        <Form.Control required type="text" className="form-control" id="Country" name="country" placeholder="Country Name" value={getFallbackIfEmpty(this.state.address.country)} onChange={this.handleAddressChange} />
                        <Form.Control.Feedback type="invalid">Please enter country name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Zip</label>
                        <Form.Control required type="text" className="form-control" id="Zip" name="zipcode" pattern="\d{5,6}" placeholder="Zip Code" value={getFallbackIfEmpty(this.state.address.zipcode)} onChange={this.handleAddressChange} />
                        <Form.Control.Feedback type="invalid">Please enter valid 5-6 digit zipcode</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label >Contact Person</label>
                        <Form.Control required type="text" className="form-control" id="contactPerson" name="contactPerson" placeholder="Contact Person" value={this.state.contactPerson} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please enter name of the contact person</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label >Contact Number</label>
                        <Form.Control required type="text" className="form-control" id="contact" name="contact" pattern="\d{10}" placeholder="Contact Number" value={this.state.contact} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please enter 10 digit contact number</Form.Control.Feedback>
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

const getFallbackIfEmpty = (val , fallback="") => {
    if(val) return val;
    return fallback
}

const mapStateToProps = state => {
    const branches = Object.keys(state.BRANCHES.allRecords).map(branch => {
        return state.BRANCHES.allRecords[branch].name.toUpperCase();
    });
    return {
        branches
    }
};
export default connect(mapStateToProps)(BranchForm);