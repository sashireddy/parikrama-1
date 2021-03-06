import React, { Component } from "react";
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";

import Spinner from "../../shared/Spinner";
import Pagination from "../../shared/Pagination";
import Modal from "../../shared/Modal";
import isAllowed, {ACTION_MANAGE} from "../../utils/accessControl";

class CrudSkeleton extends Component {

    constructor(){
        super()
        this.state = {
            showModal: false,
            currentRecord: null,
            actionType: null,
            sort:{},
            search: {},
            currentPage: 1,
            totalRecords: null
        }
    }

    loadData() {
        const params = {
            "currentPage": this.state.currentPage,
            "pageLimit": this.props.pageLimit,
            "search": this.state.search,
            "sort":this.state.sort
        };
        this.props.getData(params);
    }

    componentDidMount(){
        this.setState({
                sort: this.props.sort,
                search: this.props.search,
                currentPage: this.props.currentPage,
                totalRecords: this.props.totalRecords
            },
            this.loadData
        );
    }

    onPageChanged = data => {
        this.setState(
            {currentPage: data.currentPage},
            this.loadData
        );
    }

    openActionMaodal = (currentRecord, actionType) => {
        this.setState({currentRecord, showModal: true, actionType});
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
        this.props.deleteData(this.state.currentRecord);
        this.closeModal();
    }

    onSearch = evt => {
        evt.preventDefault();
        this.loadData();
    }

    handleChange = evt => {
        this.setState({
            search: {
                ...this.state.search,
                [evt.target.dataset.field]: evt.target.value
            }
        },this.loadData);
    }
    handleSortClick = (column) => {
        this.setState({
            sort: {
                key: column,
                direction: "asc" === this.state.sort.direction ? "desc" : "asc"
            }
        }, this.loadData);
    }
    getSortIcon = attr => {
        if(this.state.sort.attr !== attr) return ''
        if(this.state.sort.assending) return <i className="fa fa-sort-asc"></i>
        else return <i className="fa fa-sort-desc"></i>
    }

    render() {
        const AddModal = this.props.AddModal
        const EditModal = this.props.EditModal
        const ViewModal = this.props.ViewModal
        const DeleteModal = this.props.DeleteModal
        const TableRowFunc = this.props.tableRowRenderFunc
        let addFlag = isAllowed(ACTION_MANAGE, this.props.moduleName)
        if(this.props.addOverride !== undefined ){
            addFlag = this.props.addOverride
        }

        return (
            <div className={this.props.customClass}>
                <Spinner loading={this.props.loading} />
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
                {this.props.children}
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">

                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <Form className="form-inline justify-content-end paddedLine" onSubmit={this.onSearch}>
                                        <Form.Group>
                                            {this.props.headerArr.map((entry,idx)=>{
                                                if(!entry.searchable) return null
                                                return(
                                                    <div className="input-group paddedSearchBox" key={`search-${idx}`}>
                                                    <Form.Control type="text" name="search" data-field={entry.key}
                                                        onChange={this.handleChange}
                                                        className="form-control"
                                                        placeholder={'Search '+entry.value}
                                                        value={this.state.search[entry.key] || ""}
                                                        aria-label={'Search '+entry.value}/>
                                                        <div className="input-group-append">
                                                            <button className="btn btn-sm btn-primary" type="submit">
                                                                <i className="fa fa-search"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </Form.Group>
                                        <Form.Group>
                                            <select name="search" className="ml-2 mr-1 form-control" id="status-filter" data-field="isActive"
                                                value={this.state.search.isActive || ""} onChange={this.handleChange} >
                                                <option value="">All</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </Form.Group>
                                        {(addFlag && AddModal) && <Button onClick={() => this.openActionMaodal(null, "add")} className="btn btn-primary ml-2 search-btn">{this.props.content.addButton || 'Add Record'}</Button>}
                                    </Form>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                {this.props.headerArr.map((entry, idx)=>{
                                                    if(entry.sortable){
                                                        const className = entry.key === this.state.sort.key ? "sortable " + this.state.sort.direction : "sortable"
                                                        return (
                                                            <th key={idx} className={className} onClick={()=>this.handleSortClick(entry.key)}>{entry.value}</th>
                                                        )
                                                    }
                                                    return <th key={idx}>{entry.value}</th>
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.props.data.length ?
                                            this.props.data.map((record)=> <TableRowFunc record={record} key={record[this.props.pk]} openActionMaodal={this.openActionMaodal} {...this.props} updateData={this.updateData}/>)
                                            : <tr><td colSpan={this.props.headerArr.length} className="text-center">No Records found!</td></tr>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                {this.props.data.length > 0 && (
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
                            </div>
                        </div>
                        <Modal title={this.props.getTitle(this.state.actionType)}
                            type={this.state.actionType}
                            show={this.state.showModal}
                            closeModal={this.closeModal}>
                            {AddModal && this.state.actionType === "add" && (
                                <AddModal
                                closeModal={this.closeModal}
                                addData={this.addData}
                                state = {this.props.state}
                                />
                            )}
                            {ViewModal && this.state.actionType === "view" && (
                                <ViewModal
                                record={this.state.currentRecord}
                                closeModal={this.closeModal}
                                state = {this.props.state}
                                />
                            )}
                            {EditModal && this.state.actionType === "edit" && (
                                <EditModal
                                record={this.state.currentRecord}
                                closeModal={this.closeModal}
                                updateData={this.updateData}
                                />
                            )}
                            {DeleteModal && this.state.actionType === "del" && (
                                <DeleteModal
                                record={this.state.currentRecord}
                                closeModal={this.closeModal}
                                deleteData={this.deleteData}
                                updateData={this.updateData}
                                />
                            )}
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

export default CrudSkeleton;
