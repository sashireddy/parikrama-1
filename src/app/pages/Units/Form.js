import {Form} from 'react-bootstrap'
import React from "react";

class AddCategory extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ...props.record,
            isActive : true,
        }
    }
    onSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            this.props.onSubmit({...this.state});
            this.props.closeModal();
        }
        
    }

    handleChange = evt => {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
        });
    }

    render() {
        return (
            <form className="forms-sample" onSubmit={this.onSubmit} >
            <div className="pl-3 pr-3">
                <Form.Group>
                    <label htmlFor="description">Unit</label>
                    <Form.Control type="text" className="form-control" id="categoryDesc" name="name" placeholder="Unit" value={this.state.name} onChange={this.handleChange} />
                    <Form.Control.Feedback type="invalid">Provide the Unit Name</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <label htmlFor="description">Description</label>
                    <Form.Control type="text" className="form-control" id="categoryDesc" name="description" placeholder="description" value={this.state.description} onChange={this.handleChange} />
                    <Form.Control.Feedback type="invalid">Provide the Unit description</Form.Control.Feedback>
                </Form.Group>
            </div>
            <hr className="modal-footer-ruler" />
            <div className="text-right">
                <button type="button" className="btn btn-light mr-2" onClick={this.props.closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Unit</button>
            </div>
        </form>
        );
    }
}



export default AddCategory;