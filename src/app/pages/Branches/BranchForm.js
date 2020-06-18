import React from "react";
import {Form} from "react-bootstrap";

class BranchForm extends React.Component {
    constructor(){
        super();
        this.state = {
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

    render() {
        return(
            <form className="forms-sample" onSubmit={this.onSubmit} >
                <div className="pl-3 pr-3">
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Branch Name</label>
                        <Form.Control required type="text" className="form-control" id="categoryName" name="name" placeholder="Category Name" value={this.state.name} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please choose a branch name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Street</label>
                        <Form.Control type="text" className="form-control" id="Street" name="street" placeholder="Street Name" value={this.state.street} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please provide street name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">City</label>
                        <Form.Control type="text" className="form-control" id="City" name="city" placeholder="City Name" value={this.state.city} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please provide street name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">State</label>
                        <Form.Control type="text" className="form-control" id="State" name="state" placeholder="State Name" value={this.state.state} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please provide State name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Country</label>
                        <Form.Control type="text" className="form-control" id="Country" name="country" placeholder="Country Name" value={this.state.country} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please provide country name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Zip</label>
                        <Form.Control type="text" className="form-control" id="Zip" name="zip" placeholder="Zip Code" value={this.state.zip} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please provide street name</Form.Control.Feedback>
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

export default BranchForm;