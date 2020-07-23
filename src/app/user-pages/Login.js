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
      validated: false
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
                <h6 className="font-weight-light">Sign in to continue.</h6>
                {this.state.authError && <Alert variant="danger">Invalid username or password</Alert>}
                <Form className="pt-3" noValidate validated={this.state.validated} onSubmit={this.submit}>
                  <Form.Group className="search-field">
                    <Form.Control required pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}" name="username" type="text" placeholder="Username" size="lg" className="h-auto" onChange={this.handleChange}/>
                    <Form.Control.Feedback type="invalid">Please enter valid email id</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="search-field">
                    <Form.Control required minlength="1" name="password" type="password" placeholder="Password" size="lg" className="h-auto" onChange={this.handleChange}/>
                    <Form.Control.Feedback type="invalid">Please enter password</Form.Control.Feedback>
                  </Form.Group>
                  <div className="mt-3">
                    <Button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit" >Sign In</Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapActionToProps)(withFirebase(Login))
