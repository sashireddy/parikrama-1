import React, { Component } from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {getCategories, setCategoryLoading, paginate} from "../../actions/categoryActions";
import CategoryListItem from "./categoryListItem";
import Spinner from "../../shared/Spinner";
import Pagination from "../../shared/Pagination";

class ListCategory extends Component {

  componentDidMount(){
    if(this.props.categories.length === 0){
      this.props.getCategories(this.props);
    }
  }

  onPageChanged = data => {
    this.props.paginate({ currentPage: data.currentPage});
  }

  render() {
    let categorisContent = null;
    if(this.props.loading){
      categorisContent = <Spinner />
    } else {
      categorisContent = this.props.currentCategories && this.props.currentCategories.map(category => <CategoryListItem category={category} key={category.id} />);
    }

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Category Listing </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                List Categories
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Category Listing</h4>
                {this.props.loading ? <Spinner /> :
                  <React.Fragment>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th> Category Id </th>
                            <th> Category Name </th>
                            <th> Description </th>
                            <th className="text-center"> Actions </th>
                          </tr>
                        </thead>
                        <tbody>{categorisContent}</tbody>
                      </table>
                    </div>
                    {this.props.currentCategories.length &&
                      <div className="mt-4">
                          <Pagination
                            totalRecords={this.props.totalRecords}
                            currentPage={this.props.currentPage}
                            pageLimit={this.props.pageLimit}
                            pageNeighbours={1}
                            onPageChanged={this.onPageChanged}
                          />
                      </div>
                    }
                  </React.Fragment>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{ 
  return{
  categories: state.category.categories,
  currentCategories: state.category.currentCategories,
  pageLimit: state.category.pageLimit,
  currentPage: state.category.currentPage,
  totalRecords: state.category.totalRecords,
  loading: state.category.loading
}};

const mapActionToProps = {
  getCategories,
  setCategoryLoading,
  paginate
};

export default connect(mapStateToProps, mapActionToProps)(ListCategory);
