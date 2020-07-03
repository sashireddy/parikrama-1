import React, { Component } from 'react';
import {connect} from 'react-redux'
import Login from './user-pages/Login'
import App from './App'

const mapStateToProps = state => ({
    ...state.AUTH
});

class Entry extends Component {
    
    render() {
        if(this.props.loggedIn){
            return <App />
        }
        return <Login /> 
    }
}

export default connect(mapStateToProps,{})(Entry)