import React, { Component } from 'react';
import {connect} from 'react-redux'
import Login from './user-pages/Login'
import App from './App'
import Firebase from './Firebase/firebase'
import {login,logout} from './actions/login'

const mapStateToProps = state => ({
    ...state.AUTH
});

class Entry extends Component {
    
    componentDidMount() {
        console.log(Firebase.auth.currentUser)
        Firebase.auth.onAuthStateChanged(user => {
            console.log(user)
            if(user){
                this.props.login()
            }else{
                this.props.logout()
            }
        })
    }
    render() {
        if(this.props.loggedIn){
            return <App />
        }
        return <Login /> 
    }
}

export default connect(mapStateToProps,{login,logout})(Entry)