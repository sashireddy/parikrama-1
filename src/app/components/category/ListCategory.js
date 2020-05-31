import React, { Component } from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";

import * as categoryActions from "../../actions/categoryActions";
import CategoryListItem from "./CategoryListItem";
import ViewCategory from "./ViewCategory";
import EditCategory from "./EditCategory";
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";
import Spinner from "../../shared/Spinner";
import Pagination from "../../shared/Pagination";
import Modal from "../../shared/Modal";

class ListCategory extends Component {

    constructor(){
        super()
        this.state = {
            showModal: false,
            currentCategory: null,
            actionType: null,
            search: {
                "name": ""
            },
            currentPage: 1
        }
    }

    loadData() {
        const params = {
            "currentPage": this.state.currentPage,
            "pageLimit": this.props.pageLimit,
            "search": this.state.search
        };
        this.props.getData(params);
    }

    componentDidMount(){
        this.loadData();
    }

    onPageChanged = data => {
        this.setState(
            {currentPage: data.currentPage},
            this.loadData
        );
    }

    openActionMaodal = (currentCategory, actionType) => {
        this.setState({currentCategory, showModal: true, actionType});
    }

    closeModal = () => {
        this.setState({showModal: false});
    }

    updateData = data => {
        this.props.updateData(data);
    }

    addData = data => {
        this.props.addData(data);
    }

    deleteData = () => {
        this.props.deleteData(this.state.currentCategory);
        this.closeModal();
    }

    onSearch = evt => {
        evt.preventDefault();
        this.loadData();
    }

    handleChange = evt => {
        this.setState({
            search: {
                [evt.target.dataset.field]: evt.target.value
            }
        });
    }

    render() {
        let categorisContent = null;
        if(this.props.loading){
            categorisContent = <Spinner />
        } else {
            categorisContent = this.props.data && this.props.data.map(category => <CategoryListItem category={category} key={category._id} openActionMaodal={this.openActionMaodal} />);
        }

        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> Manage Category </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
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
                                {this.props.loading ? ( <Spinner />) : (
                                    <React.Fragment>
                                        <div className="table-responsive">
                                            <Form className="form-inline justify-content-end" onSubmit={this.onSearch}>
                                                <Form.Group>
                                                    <div className="input-group">
                                                    <Form.Control type="text" name="search" data-field="name" onChange={this.handleChange} value={this.state.search.name} className="form-control" placeholder="Search Category" aria-label="Search Category"/>
                                                        <div className="input-group-append">
                                                        <button className="btn btn-sm btn-primary" type="submit">
                                                            <i className="fa fa-search"></i>
                                                        </button>
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                                <Button onClick={() => this.openActionMaodal(null, "add")} className="btn btn-primary ml-2 search-btn">Add Category</Button>
                                            </Form>
                                            <table className="table table-striped table-hover">
                                                <thead>
                                                <tr>
                                                    <th className="d-none d-sm-table-cell"> Category Id </th>
                                                    <th> Category Name </th>
                                                    <th className="d-none d-sm-table-cell"> Description </th>
                                                    <th className="text-center"> Actions </th>
                                                </tr>
                                                </thead>
                                                <tbody>{categorisContent}</tbody>
                                            </table>
                                        </div>
                                        {this.props.data.length && (
                                            <div className="mt-4">
                                                <Pagination
                                                totalRecords={this.props.totalRecords}
                                                currentPage={this.props.currentPage}
                                                pageLimit={this.props.pageLimit}
                                                pageNeighbours={1}
                                                onPageChanged={this.onPageChanged}
                                                />
                                            </div>
                                        )}
                                    </React.Fragment>
                                )}
                            </div>
                        </div>
                        <Modal title={getTitle(this.state.actionType)}
                            type={this.state.actionType}
                            show={this.state.showModal}
                            closeModal={this.closeModal}>

                            {this.state.actionType === "add" && (
                                <AddCategory
                                closeModal={this.closeModal}
                                addData={this.addData}
                                />
                            )}
                            {this.state.actionType === "view" && (
                                <ViewCategory
                                category={this.state.currentCategory}
                                closeModal={this.closeModal}
                                />
                            )}
                            {this.state.actionType === "edit" && (
                                <EditCategory
                                category={this.state.currentCategory}
                                closeModal={this.closeModal}
                                updateData={this.updateData}
                                />
                            )}
                            {this.state.actionType === "del" && (
                                <DeleteCategory
                                category={this.state.currentCategory}
                                closeModal={this.closeModal}
                                deleteData={this.deleteData}
                                />
                            )}
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

function getTitle(actionType) {
    switch (actionType) {
        case "add":
            return "Add Category";
        case "view":
            return "View Category";
        case "edit":
            return "Edit Category";
        case "del":
            return "Delete Category";
        default:
            return "Manage Category";
    }
}

const mapStateToProps = state => ({
    ...state.category
});

const mapActionToProps = {
    ...categoryActions
};

export default connect(mapStateToProps, mapActionToProps)(ListCategory);
