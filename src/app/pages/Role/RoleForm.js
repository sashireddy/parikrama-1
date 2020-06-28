import React from "react";
import {connect} from "react-redux";
import {Form} from "react-bootstrap";

class RoleForm extends React.Component {
    constructor(){
        super();
        this.state = {
            label:"",
            description:"",
            isActive: true,
            permissions: []
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

    onPermissionChange = evt => {
        if(evt.target.checked) {
            this.setState({
                permissions: this.state.permissions.concat(evt.target.value)
            });
        } else {
            let permissions = [...this.state.permissions];
            let index = permissions.indexOf(evt.target.value);
            if (index !== -1) {
                permissions.splice(index, 1);
                this.setState({permissions});
            }
        }
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
                        <label htmlFor="name">Role Name</label>
                        <Form.Control required type="text" className="form-control" id="categoryName" name="label" placeholder="Role" value={this.state.label} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please choose a category name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="description">Role Description</label>
                        <Form.Control type="text" className="form-control" id="categoryDesc" name="description" placeholder="Category Description" value={this.state.description} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Provide description of the category</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="isActive">Role Status</label>
                        <Form.Check type="radio" id="categoryIsActive" name="isActive" value="active" label="Active" checked={this.state.isActive} onChange={this.onStatusChange} />
                        <Form.Check type="radio" id="categoryIsInActive" name="isActive" value="inActive" label="In Active" checked={!this.state.isActive} onChange={this.onStatusChange} />
                    </Form.Group>
                    <Form.Group id="formGridCheckbox">
                        <label htmlFor="permissions">Role Permissions</label>
                        {this.props.allPermissions.map(permission => {
                            let checked = this.state.permissions.includes(permission.permission);
                            return <Form.Check key={permission.id} type="checkbox" value={permission.permission} id={`permission_${permission.id}`} label={permission.permission} checked={checked} onChange={this.onPermissionChange} />
                        })}
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
    return{
        ...state["PERMISSION"]
    }
}

export default connect(mapStateToProps, null)(RoleForm);