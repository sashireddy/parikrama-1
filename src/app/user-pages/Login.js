import React, { Component } from 'react';
import { Form, Button,Alert } from 'react-bootstrap';
import {withFirebase} from '../Firebase/context'
import {connect} from 'react-redux'
import {login} from '../actions/login'

import Spinner from "../shared/Spinner";

const mapStateToProps = state => ({})
const mapActionToProps = {
  login
}
export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username : '',
      password : '',
      loading : false,
      authError: false,
      validated: false,
      loginView: true,
      validatedForgotPassword: false,
      errorMsg: ""
    }
  }

  handleChange = evt => {
    this.setState({
        ...this.state,
        [evt.target.name]: evt.target.value
    });
  }

  submit = (e)=>{
    const form = e.currentTarget;
    e.preventDefault();
    this.setState({validated: true});
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.setState({
      loading:true,
      password:''
     });
    this.props.firebase.doSignInWithEmailAndPassword(this.state.username,this.state.password)
    .then(resp=> {
      this.props.firebase.auth.currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
        // localStorage.setItem('Token',idToken)
        // localStorage.setItem('ExpiryTime',new Date().setMinutes(new Date().getMinutes()+30))
        this.props.login({
          email:this.state.username,
          token: idToken
        })
      }).catch(function(error) {
        throw error
      });
    })
    .catch(err => {
      this.setState({
        loading:false,
        authError : true
      })
    })
  }

  toggleView = e => {
    e.preventDefault();
    this.setState({loginView: !this.state.loginView});
  }

  forgotPassword = e =>{
    const form = e.currentTarget;
    e.preventDefault();
    this.setState({
      validatedForgotPassword: true,
      forgotPasswordErr: false,
      forgotPasswordSuccess: false
    });
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.setState({
      loading:true
    });
    this.props.firebase.auth.sendPasswordResetEmail(this.state.username).then(() => {
      console.log("Reset password has been sent to your mail.");
      this.setState({
        loading:false,
        forgotPasswordSuccess: true,
        forgotPasswordErr: false
      });
    }).catch(error => {
      this.setState({
        errorMsg: error.message,
        loading:false,
        forgotPasswordErr: true,
        forgotPasswordSuccess: false,
      });
    });
  }

  render() {
    return (
      <div>
        <Spinner loading={this.state.loading}/>
        <div className="d-flex align-items-center justify-content-center login-wrapper auth px-0">
          <div className="row w-100 mx-0 login-half-bg">
            <div className="col-xl-4 col-lg-5 col-md-6 mx-auto login-box p-0">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo text-center">
                  <img src={require("../../assets/images/parikrama-logo.png")} alt="Parikrama Logo" />
                </div>
                <h4>Inventory Management</h4>
                {this.state.loginView ?
                  <React.Fragment>
                    <h6 className="font-weight-light">Sign in to continue.</h6>
                    {this.state.authError && <Alert variant="danger">Invalid username or password</Alert>}
                    <Form className="pt-3" noValidate validated={this.state.validated} onSubmit={this.submit}>
                      <Form.Group className="search-field">
                        <Form.Control required pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}" name="username" type="text" placeholder="Email-ID" size="lg" className="h-auto" onChange={this.handleChange}/>
                        <Form.Control.Feedback type="invalid">Please enter valid email id</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="search-field">
                        <Form.Control required minLength="1" name="password" type="password" placeholder="Password" size="lg" className="h-auto" onChange={this.handleChange}/>
                        <Form.Control.Feedback type="invalid">Please enter password</Form.Control.Feedback>
                      </Form.Group>
                      <div className="mt-3">
                        <Button className="btn btn-block btn-primary btn-lg font-weight-bold auth-form-btn" type="submit" >Sign In</Button>
                      </div>
                      <p className="pull-right"><button type="button" className="btn btn-link pr-0 mt-2" onClick={this.toggleView}>Forgot Password?</button></p>
                    </Form>
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <h6 className="font-weight-light">Forgot Password</h6>
                    {this.state.forgotPasswordSuccess && <Alert variant="success">Reset password link has been sent to your email address please check your mail.</Alert>}
                    {this.state.forgotPasswordErr && <Alert variant="danger">{this.state.errorMsg}</Alert>}
                    <Form className="pt-3" noValidate validated={this.state.validatedForgotPassword} onSubmit={this.forgotPassword}>
                      <Form.Group className="search-field">
                        <Form.Control required pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}" name="username" type="text" placeholder="Email-ID" size="lg" className="h-auto" onChange={this.handleChange}/>
                        <Form.Control.Feedback type="invalid">Please enter valid email id</Form.Control.Feedback>
                      </Form.Group>
                      <div className="mt-3">
                        <Button className="btn btn-block btn-primary btn-lg font-weight-bold auth-form-btn" type="submit" >Submit</Button>
                      </div>
                      <p className="pull-right"><button type="button" className="btn btn-link pr-0 mt-2" onClick={this.toggleView}>Back to Login</button></p>
                    </Form>
                  </React.Fragment>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapActionToProps)(withFirebase(Login))
