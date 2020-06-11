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
    console.log(props)
    this.state = {
      username : '',
      password : '',
      loading : false,
      authError: false,
    }
  }

  handleChange = evt => {
    this.setState({
        ...this.state,
        [evt.target.name]: evt.target.value
    });
  }

  submit = (e)=>{
    e.preventDefault()
    this.setState({ 
      loading:true,
      password:''
     })
    this.props.firebase.doSignInWithEmailAndPassword(this.state.username,this.state.password)
    .then(resp=> {
      this.props.login({
        email:this.state.username
      })
      this.setState({
        loading:false,
      })
      
    })
    .catch(err => {
      this.setState({
        loading:false,
        authError : true
      })
    })
  }

  render() {
    if(this.state.loading) return <Spinner/>
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0 login-half-bg">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src='http://www.parikrma.in/wp-content/uploads/2020/03/Parikrma-button-logo-with-words-Black-e1583919187330.png' alt="logo" />
                </div>
                <h4>Inventory Management</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                {this.state.authError && <Alert variant="danger">Please check your Password</Alert>}
                <Form className="pt-3" onSubmit={this.submit}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control name="username" type="email" placeholder="Username" size="lg" className="h-auto" onChange={this.handleChange}/>
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control name="password" type="password" placeholder="Password" size="lg" className="h-auto" onChange={this.handleChange}/>
                  </Form.Group>
                  <div className="mt-3">
                    <Button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit" >Sign IN</Button>
                    {/* <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">SIGN IN</Link> */}
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
