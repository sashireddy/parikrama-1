import React, { Component } from "react";
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";

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
            sort:{
                assending:true,
                attr : 'name'
            },
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
            "search": this.state.search,
            sort:this.state.sort
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
    handleSortClick = attr => {

    }

    handleChange = evt => {
        this.setState({
            search: {
                [evt.target.dataset.field]: evt.target.value
            }
        },this.loadData);
    }
    handleSortClick = (column) => {
        this.setState({
            sort: {
                key: column,
                direction: (column === this.state.sort.key )? !this.state.sort.direction : "asc"
            }
        }, this.loadData);
    }
    getSortIcon = attr => {
        if(this.state.sort.attr !== attr) return ''
        if(this.state.sort.assending) return <i className="fa fa-sort-asc"></i>
        else return <i className="fa fa-sort-desc"></i>
    }

    render() {
        // console.log(this.state)
        const AddModal = this.props.AddModal
        const EditModal = this.props.EditModal
        const ViewModal = this.props.ViewModal
        const DeleteModal = this.props.DeleteModal
        const TableRowFunc = this.props.tableRowRenderFunc
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> {this.props.content.pageTitle} </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {this.props.content.pageTitle}
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
                                                {this.props.headerArr.map((entry,idx)=>{
                                                    if(!entry.searchable) return <></>
                                                    return(
                                                        <>
                                                        <Form.Control key={'Search'+entry.value} type="text" name="search" data-field="name"
                                                         onChange={this.handleChange}
                                                         className="form-control" placeholder={'Search'+entry.value} value={this.state.search[entry.value]} aria-label={'Search'+entry.value}/>
                                                        <div className="input-group-append">
                                                            <button className="btn btn-sm btn-primary" type="submit">
                                                                <i className="fa fa-search"></i>
                                                            </button>
                                                        </div>
                                                        </>
                                                    )
                                                })}
                                                    </div>
                                                </Form.Group>
                                                <Button onClick={() => this.openActionMaodal(null, "add")} className="btn btn-primary ml-2 search-btn">Add Category</Button>
                                            </Form>
                                            <table className="table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                    {/* <th className="d-none d-sm-table-cell" onClick={()=>this.handleSortClick('_id')}> Category Id {this.getSortIcon('_id')} </th> */}
                                                    {/* <th onClick={()=>this.handleSortClick('name')}> Category Name {this.getSortIcon('name')}</th> */}
                                                        {this.props.headerArr.map((entry,idx)=>{
                                                            if(entry.sortable ){
                                                                return (
                                                                    <th onClick={()=>this.handleSortClick(entry.key)}>{entry.value}</th>
                                                                )
                                                            }
                                                            return<th>{entry.value}</th>
                                                        })}
                                                    {/* <th className="d-none d-sm-table-cell"> Category Id </th>
                                                    <th> Category Name </th>
                                                    <th className="d-none d-sm-table-cell"> Description </th>
                                                    <th className="text-center"> Actions </th> */}
                                                    </tr>
                                                </thead>
                                                {this.props.loading && <Spinner />}
                                                <tbody>{this.props.data && this.props.data.map((category)=>{
                                                    return <TableRowFunc category={category} key={category._id} openActionMaodal={this.openActionMaodal} {...this.props}/>
                                                })}</tbody>
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
                        <Modal title={this.props.getTitle(this.state.actionType)}
                            type={this.state.actionType}
                            show={this.state.showModal}
                            closeModal={this.closeModal}>

                            {this.state.actionType === "add" && (

                                <AddModal
                                closeModal={this.closeModal}
                                addData={this.addData}
                                />
                            )}
                            {this.state.actionType === "view" && (
                                <ViewModal
                                category={this.state.currentCategory}
                                closeModal={this.closeModal}
                                />
                            )}
                            {this.state.actionType === "edit" && (
                                <EditModal
                                category={this.state.currentCategory}
                                closeModal={this.closeModal}
                                updateData={this.updateData}
                                /> 
                            )}
                            {this.state.actionType === "del" && (
                                
                                 <DeleteModal
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

export default ListCategory
