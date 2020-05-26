import React, { Component } from "react";
import {connect} from 'react-redux';

import {getCategories} from '../../actions/categoryActions';
import CategoryListItem from './categoryListItem';
import Spinner from "../../shared/Spinner";

class ListCategory extends Component {

  componentDidMount(){
      this.props.getCategories();
  }

  render() {
    let categorisContent = null;
    console.log(this.props, this.props.categorie);
    if(this.props.loading){
      categorisContent = <Spinner />
    } else {
      categorisContent = this.props.categories && this.props.categories.map(category => <CategoryListItem category={category} key={category.id} />);
    }

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Category Listing </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Dashboard
                </a>
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
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> Category Id </th>
                        <th> Category Name </th>
                        <th> Description </th>
                        <th> Actions </th>
                      </tr>
                    </thead>
                    <tbody>{categorisContent}</tbody>
                  </table>
                </div>
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
