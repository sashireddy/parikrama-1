import React, { Component } from 'react';
import {connect} from 'react-redux'
import Login from './user-pages/Login'
import App from './App'
import Firebase from './Firebase/firebase'
import {login,logout} from './actions/login'
import Spinner from '../app/shared/Spinner';
import axios from 'axios'
const mapStateToProps = state => ({
    ...state.AUTH
});

class Entry extends Component {

    componentDidMount() {
        Firebase.auth.onAuthStateChanged(user => {
            if(user){
                user.getIdToken().then(id => {
                    axios.defaults.headers.common["Authorization"]=`Bearer ${id}`
                    this.props.login()
                    localStorage.setItem('loggedIn', true)
                })
            }else{
                localStorage.removeItem('loggedIn')
                this.props.logout()
            }
        });
    }
    render() {
        if(this.props.expectedLoggedIn){
            return <Spinner loading/>
        }
        if(this.props.loggedIn){
            return <App />
        }
        return <Login />
    }
}

export default connect(mapStateToProps,{login,logout})(Entry)