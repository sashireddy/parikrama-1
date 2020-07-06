import React from "react";
import {Form} from "react-bootstrap";

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
        console.log(this.state)
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

    onSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            this.props.onSubmit({...this.state});
        }

        
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
            <form className="forms-sample" onSubmit={this.onSubmit} >
                <div className="pl-3 pr-3">
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Branch Name</label>
                        <Form.Control required type="text" className="form-control" id="branchName" name="name" placeholder="Branch Name" value={this.state.name} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please choose a branch name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Street</label>
                        <Form.Control type="text" className="form-control" id="Street" name="street" placeholder="Street Name" value={getFallbackIfEmpty(this.state.address.street)} onChange={this.handleAddressChange} />
                        <Form.Control.Feedback type="invalid">Please provide street name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">City</label>
                        <Form.Control type="text" className="form-control" id="City" name="city" placeholder="City Name" value={getFallbackIfEmpty(this.state.address.city)} onChange={this.handleAddressChange} />
                        <Form.Control.Feedback type="invalid">Please provide street name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">State</label>
                        <Form.Control type="text" className="form-control" id="State" name="state" placeholder="State Name" value={getFallbackIfEmpty(this.state.address.state)} onChange={this.handleAddressChange} />
                        <Form.Control.Feedback type="invalid">Please provide State name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Country</label>
                        <Form.Control type="text" className="form-control" id="Country" name="country" placeholder="Country Name" value={getFallbackIfEmpty(this.state.address.country)} onChange={this.handleAddressChange} />
                        <Form.Control.Feedback type="invalid">Please provide country name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Zip</label>
                        <Form.Control type="text" className="form-control" id="Zip" name="zipcode" placeholder="Zip Code" value={getFallbackIfEmpty(this.state.address.zipcode)} onChange={this.handleAddressChange} />
                        <Form.Control.Feedback type="invalid">Please provide street name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="isActive">Branch Status</label>
                        <Form.Check type="radio" id="BranchIsActive" name="isActive" value="active" label="Active" checked={this.state.isActive} onChange={e=>this.onStatusChange(e,"isActive")} />
                        <Form.Check type="radio" id="BranchIsInActive" name="isActive" value="inActive" label="In Active" checked={!this.state.isActive} onChange={e=>this.onStatusChange(e,"isActive")} />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="isHeadOffice">Head Office</label>
                        <Form.Check type="radio" id="HeadOfficeIsActive" name="isActive" value="active" label="Head Office" checked={this.state.isHeadOffice} onChange={e=>this.onStatusChange(e,"isHeadOffice")} />
                        <Form.Check type="radio" id="HeadOfficeIsActive" name="isActive" value="inActive" label="Not Head office" checked={!this.state.isHeadOffice} onChange={e=>this.onStatusChange(e,"isHeadOffice")} />
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

const getFallbackIfEmpty = (val , fallback="") => {
    if(val) return val;
    return fallback
}
export default BranchForm;