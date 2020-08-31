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
        // Using interceptors to redirect to login page on 401
        axios.interceptors.response.use(
            response => response,
            error => {
                if(error.toString().includes("401")){
                    // eslint-disable-next-line
                    window.location.href = window.location.href;
                }
                return Promise.reject(error);
            }
        );

        Firebase.auth.onAuthStateChanged(user => {
            if(user){
                user.getIdToken(true).then(id => {
                    axios.defaults.headers.common["Authorization"]=`Bearer ${id}`
                    this.props.login();
                    localStorage.setItem("loggedIn", true);
                    localStorage.setItem("tokenIssuedAt", new Date().getTime());
                    axios.interceptors.request.use(async config => {
                        // perform a task before the request is sent
                        let tokenIssuedAt = localStorage.getItem("tokenIssuedAt");
                        let timeStamp = new Date().getTime();
                        if(timeStamp - tokenIssuedAt > 3600000){ // 3600000 one hour in ms
                            try {
                                let id = await user.getIdToken();
                                localStorage.setItem("tokenIssuedAt", timeStamp);
                                config.headers.Authorization = `Bearer ${id}`;
                                axios.defaults.headers.common["Authorization"]=`Bearer ${id}`;
                            } catch(err) {
                                // eslint-disable-next-line
                                window.location.href = window.location.href;
                            }
                            return config;
                        } else {
                            return Promise.resolve(config);
                        }
                    }, error => Promise.reject(error));
                });
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