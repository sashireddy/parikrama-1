import React from "react";
import {Form} from "react-bootstrap";
import Spinner from "../../shared/Spinner";
import Firebase from '../../Firebase/firebase';

class ChangePassword extends React.PureComponent{

    constructor(){
        super();
        this.state = {
            currentPassword: "",
            password: "",
            confirmPassword: "",
            validated: false,
            loading: false,
            errorMsg: "",
            changeSuccess: false
        }
        this.password = React.createRef();
        this.confirmPassword = React.createRef();
    }

    handleChange = evt => {
        if(["password", "confirmPassword"].includes(evt.target.name)){
            let password = this.password.current.value;
            let confirmPassword = this.confirmPassword.current.value;
            if (password !== confirmPassword) {
                this.confirmPassword.current.setCustomValidity("Passwords do not match.");
            } else {
                this.confirmPassword.current.setCustomValidity("");
            }
        }
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    onSubmit = event => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            this.setState({loading: true});
            // Need to use firebase to updated the password
            const user = Firebase.auth.currentUser;
            const credentials = Firebase.doGetCredentials(
                user.email,
                this.state.currentPassword
            );

            console.log(credentials, user);
            user.reauthenticateWithCredential(credentials).then(() => {
                user.updatePassword(this.state.password).then(() => {
                    this.setState({
                        loading: false,
                        changeSuccess: true,
                        errorMsg: ""
                    });
                }).catch(err => {
                    this.setState({
                        loading: false,
                        changeSuccess: false,
                        errorMsg: "Unable to update the password, please try again."
                    });
                });
            }).catch(err => {
                this.setState({
                    loading: false,
                    errorMsg: "Invalid current password, please try again."
                });
            });
        }
        this.setState({validated: true});
    }

    render(){
        return(
            <Form noValidate validated={this.state.validated} onSubmit={this.onSubmit}>
                <Spinner loading={this.state.loading} />
                <div className="pl-3 pr-3">
                    {!this.state.changeSuccess && this.state.errorMsg.trim() &&
                        <div className="alert alert-danger text-center" role="alert">
                            <i className="mdi mdi-account-remove  mr-3"></i>
                            {this.state.errorMsg}
                        </div>
                    }
                    {this.state.changeSuccess &&
                        <div className="alert alert-success text-center" role="alert">
                            <i className="mdi mdi-account-key  mr-3"></i>
                            Successfully changed then password
                        </div>
                    }
                    <Form.Group>
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control required type="password" id="currentPassword" name="currentPassword" placeholder="Current Password" value={this.state.currentPassword} onChange={this.handleChange} minLength="6" />
                        <Form.Control.Feedback type="invalid">Please minimum 6 character password</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control ref={this.password} required type="password" id="userPassword" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} minLength="6" />
                        <Form.Control.Feedback type="invalid">Please minimum 6 character password</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control ref={this.confirmPassword} required type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange} minLength="6" />
                        <Form.Control.Feedback type="invalid">Confirm password doesnot match.</Form.Control.Feedback>
                    </Form.Group>
                    <hr className="modal-footer-ruler" />
                    <div className="text-right">
                        <button type="button" className="btn btn-light mr-2" onClick={this.props.closeModal}>Close</button>
                        <button type="submit" className="btn btn-primary">Change Password</button>
                    </div>
                </div>
            </Form>
        );
    }
}

export default ChangePassword;