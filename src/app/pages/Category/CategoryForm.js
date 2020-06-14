import React from "react";
import {Form} from "react-bootstrap";

class CategoryForm extends React.Component {
    constructor(){
        super();
        this.state = {
            name:"",
            description:"",
            isActive: true
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
                        <label htmlFor="name">Category Name</label>
                        <Form.Control required type="text" className="form-control" id="categoryName" name="name" placeholder="Category Name" value={this.state.name} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please choose a category name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="description">Category Description</label>
                        <Form.Control type="text" className="form-control" id="categoryDesc" name="description" placeholder="Category Description" value={this.state.description} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Provide description of the category</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="isActive">Category Status</label>
                        <Form.Check type="radio" id="categoryIsActive" name="isActive" value="active" label="Active" checked={this.state.isActive} onChange={this.onStatusChange} />
                        <Form.Check type="radio" id="categoryIsInActive" name="isActive" value="inActive" label="In Active" checked={!this.state.isActive} onChange={this.onStatusChange} />
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

export default CategoryForm;