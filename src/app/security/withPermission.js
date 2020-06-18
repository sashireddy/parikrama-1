import React from 'react'
import {connect} from 'react-redux'

// sample 
/*
 *   withAuthorization (user => user.permissions.indexof('VIEWINVENTORY') !== -1 )
*/
const withAuthorization = condition => Component => {
    const mapStateToProps = state => ({
        user : state['user']
    })
    class WithAuthorization extends React.Component {
  
      render() {
          return  condition(this.props.user) ? <Component {...this.props} /> : null
      }
    }
  
    return connect(mapStateToProps,{})(WithAuthorization)
  };
  
  export default withAuthorization;