import React, { Component } from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom"

import {getCategories} from "../../actions/categoryActions";
import Spinner from "../../shared/Spinner";

class ListCategory extends Component {

  componentDidMount(){
    this.props.getCategories({currentPage: 1, pageLimit: 5});
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> View Category </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/category/list-category">
                  Category
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                View Categories
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Category View</h4>
                {this.props.loading ? <Spinner /> :
                  <React.Fragment>
                    <div className="table-responsive">
                      page content goes here...
                    </div>
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

const mapStateToProps = state => ({
  categories: state.category.categories
});

const mapActionToProps = {
  getCategories
};

export default connect(mapStateToProps, mapActionToProps)(ListCategory);
