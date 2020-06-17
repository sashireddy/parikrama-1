import React from "react";
import {Form} from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead'

class ProductForm extends React.Component {
    constructor(){
        super();
        this.state = {
            name:"",
            description:""
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
                        <label htmlFor="exampleInputEmail1">Product Name</label>
                        <Form.Control required type="text" className="form-control" id="productName" name="name" placeholder="Category Name" value={this.state.name} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please provide a Product name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Category</label>
                        <Form.Control required type="text" className="form-control" id="categoryName" name="category" placeholder="Category Name" value={this.state.category} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please provide the category name</Form.Control.Feedback>
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

export default ProductForm;