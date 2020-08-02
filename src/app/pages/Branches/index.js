import React from 'react'
import Skeleton from '../CrudSkeleton/index'
import {connect} from "react-redux";
import ViewBranch from './ViewBranch'
import EditBranch from './EditBranch'
import DeleteBranch from './DeleteBranch'
import AddBranch from './AddBranch'
import BranchListItem from './BranchListItem'
import branchesAction from '../../actions/branchActions'
import {MODULE_BRANCH} from "../../utils/accessControl";

const mapStateToProps = state => ({
    ...state['BRANCHES']
});

const mapActionToProps = {
    ...branchesAction
};
const ProductSkeleton = connect(mapStateToProps, mapActionToProps)(Skeleton)

class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const getTitle = (actionType) => {
            switch (actionType) {
                case "add":
                    return "Create Branch";
                case "view":
                    return "View Branch";
                case "edit":
                    return "Update Branch";
                case "del":
                    return "Disable Branch";
                default:
                    return "Manage Branch";
            }
        }
        const headerArr = [
                {
                    value : 'Name',
                    key : 'name',
                    sortable : true,
                    searchable: true
                },
                {
                    value : 'Address',
                    key : 'Address'
                },
                {
                    value : 'Contact Person',
                    key : 'contactPerson'
                },
                {
                    value : 'Contact',
                    key : 'contact'
                },
                {
                    value : 'Status',
                    key:'isActive'
                },{
                    value : 'Actions',
                    key : 'actions'
                }
            ]

        return (
            <ProductSkeleton
             content={{pageTitle:'Branches', addButton: 'New Branch'}} AddModal={AddBranch}
             EditModal={EditBranch} ViewModal={ViewBranch} DeleteModal={DeleteBranch}
             tableRowRenderFunc ={BranchListItem}
             headerArr = {headerArr} getTitle={getTitle}
             moduleName={MODULE_BRANCH} pk="id"
            />
        )
    }
}

export default Products