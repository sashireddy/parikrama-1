import React, { Component } from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
// import {} from 'react-bootstrap-typeahead'
import {getUsers} from "../../actions/userActions";
import Spinner from "../../shared/Spinner";
import Pagination from "../../shared/Pagination";

const UserRowRender = props => {
    return (
      <tr>
          <td>{props.user.name}</td>
          <td>{props.user.branch}</td>
          <td>
            <nav className="text-center">
              <Link to={`/category/view/${props.category.id}`} className="btn btn-primary">
                View
              </Link>
              <Link to={`/category/edit/${props.category.id}`} className="btn btn-primary ml-2">
                Edit
              </Link>
              <Link to={`/category/edit/${props.category.id}`} className="btn btn-danger ml-2">
                Delete
              </Link>
            </nav>
          </td>
      </tr>
    );
  };

class ListUsers extends Component {
    componentDidMount(){
        this.props.getUsers()
    }
    render() {
      console.log(this.props)
        // let categorisContent = null;
        // if(this.props.loading){
        //     categorisContent = <Spinner />
        // } else {
        //     categorisContent = this.props.currentCategories && this.props.currentCategories.map(category => <CategoryListItem category={category} key={category.id} />);
        // }
        return(
            <div>
                <h1>list users</h1>
                <div>
        <div className="page-header">
          <h3 className="page-title"> User List </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Users
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Category Listing</h4>
                <buton className="btn btn-primary">add user</buton>
                {this.props.loading ? <Spinner /> :
                  <React.Fragment>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th> Name </th>
                            <th> Branch </th>
                            <th className="text-center"> Actions </th>
                          </tr>
                        </thead>
                        <tbody>
                            {this.props.users.map((user,idx)=>{
                              return(<tr>
                                <td>{user.user}</td>
                                <td>{user.branch}</td>
                                <td>
                                  <nav className="text-center">
                                  <button  className="btn btn-primary">
                                        View
                                    </button>
                                  <button  className="btn btn-primary ml-2">
                                          Edit
                                    </button>
                                  <button  className="btn btn-danger ml-2">
                                      Delete
                                  </button>
                                  </nav>
                                  </td>
                              </tr>)
                            })}
                        </tbody>
                      </table>
                    </div>
                    {/* {this.props.currentCategories.length &&
                      <div className="mt-4">
                          <Pagination
                            totalRecords={this.props.totalRecords}
                            currentPage={this.props.currentPage}
                            pageLimit={this.props.pageLimit}
                            pageNeighbours={1}
                            onPageChanged={this.onPageChanged}
                          />
                      </div>
                    } */}
                  </React.Fragment>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.user.users || [],
    pageLimit: state.user.pageLimit,
    currentPage: state.user.currentPage || 1,
    totalRecords: state.user.totalRecords,
    loading: state.user.loading
  })
  const mapActionToProps = {
    getUsers,
  };

export default connect(mapStateToProps, mapActionToProps)(ListUsers);