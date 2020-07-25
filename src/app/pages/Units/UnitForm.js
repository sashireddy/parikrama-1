import {Form} from 'react-bootstrap'
import React from "react";

class AddCategory extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            description: "",
            name: "",
            isActive : true
        }
    }

    componentDidMount(){
        this.setState({...this.props.record});
    }

    onSubmit = event => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            this.props.onSubmit({
                name: this.state.name,
                description: this.state.description,
                isActive: this.state.isActive
            });
        }
        this.setState({validated: true});
    }

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    render() {
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.onSubmit} >
                <div className="pl-3 pr-3">
                    <Form.Group>
                        <label htmlFor="description">Unit</label>
                        <Form.Control required type="text" className="form-control" id="categoryDesc" name="name" placeholder="Unit" value={this.state.name} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Plase enter Unit Name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="description">Description</label>
                        <Form.Control required type="text" className="form-control" id="categoryDesc" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please enter unit description</Form.Control.Feedback>
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



export default AddCategory;