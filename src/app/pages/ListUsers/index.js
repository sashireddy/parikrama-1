import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import {} from 'react-bootstrap-typeahead'
import { getUsers, filterUsers } from '../../actions/userActions'
import Spinner from '../../shared/Spinner'
import Pagination from '../../shared/Pagination'
import { Form, Modal } from 'react-bootstrap'

const UserRowRender = (props) => {
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
  )
}

class ListUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      selectedUser: null,
      actionType: null,
      sort:'Branch'
    }
  }
  componentDidMount() {
    this.props.getUsers()
  }
  openActionMaodal = (selectedUser, actionType) => {
    this.setState({selectedUser, showModal: true, actionType});
  }
  closeModal = () => {
    this.setState({showModal: false});
  }
  render() {
    console.log(this.props)
    // let categorisContent = null;
    // if(this.props.loading){
    //     categorisContent = <Spinner />
    // } else {
    //     categorisContent = this.props.currentCategories && this.props.currentCategories.map(category => <CategoryListItem category={category} key={category.id} />);
    // }
    return (
      <div>
        <div>
          <div className="page-header">
            <h3 className="page-title"> User List </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Dashboard</Link>
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
                  <buton className="btn btn-primary" onClick={()=>this.openActionMaodal(null,'add')}>add user</buton>
                  <Form.Group className="row">
                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">
                      Email
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputUsername2"
                        placeholder="Username"
                        onChange={(e) => this.props.filterUsers(e.target.value, this.props.users)}
                      />
                    </div>
                  </Form.Group>
                  {this.props.loading ? (
                    <Spinner />
                  ) : (
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
                            {this.props.currentUsers.map((user, idx) => {
                              return (
                                <tr>
                                  <td>{user.name}</td>
                                  <td>{user.branch}</td>
                                  <td>
                                    <nav className="text-center">
                                      <button className="btn btn-primary" onClick={()=>{}}>View</button>
                                      <button className="btn btn-primary ml-2">Edit</button>
                                      <button className="btn btn-danger ml-2">Delete</button>
                                    </nav>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </React.Fragment>
                  )}
                </div>
                <Modal title="Manage Users" type="add" show={this.state.showModal} closeModal={() => this.closeModal()} onHide={() => this.closeModal()}>
                  <form className="forms-sample" onSubmit={this.onSubmit}>
                    <div className="pl-3 pr-3">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">Category Name</label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          id="categoryName"
                          name="name"
                          placeholder="Category Name"
                          // value={this.state.name} onChange={this.handleChange} />
                        />
                      </Form.Group>
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">Category Description</label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          id="categoryDesc"
                          name="description"
                          placeholder="Category Description"
                          //  value={this.state.description} onChange={this.handleChange}
                        />
                      </Form.Group>
                    </div>
                    <hr className="modal-footer-ruler" />
                    <div className="text-right">
                      <button
                        type="button"
                        className="btn btn-light mr-2"
                        // onClick={this.props.closeModal}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {this.props.label}
                      </button>
                    </div>
                  </form>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUsers: state.user.currentUsers,
  filter: state.user.nameFilter,
  users: state.user.users || [],
  pageLimit: state.user.pageLimit,
  currentPage: state.user.currentPage || 1,
  totalRecords: state.user.totalRecords,
  loading: state.user.loading,
})
const mapActionToProps = {
  getUsers,
  filterUsers,
}

export default connect(mapStateToProps, mapActionToProps)(ListUsers)
