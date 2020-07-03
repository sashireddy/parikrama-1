import React from 'react'
import Skeleton from '../CrudSkeleton/index'
import {connect} from "react-redux";
import ViewBranch from './ViewBranch'
import EditBranch from './EditBranch'
import DeleteBranch from './DeleteBranch'
import AddBranch from './AddBranch'
import BranchListItem from './BranchListItem'
import branchesAction from '../../actions/branchActions'
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
                    return "Add Branch";
                case "view":
                    return "View Branch";
                case "edit":
                    return "Edit Branch";
                case "del":
                    return "Delete Branch";
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
                },{
                    value : 'Address',
                    key : 'Address'
                },
                {
                    value : 'Tag',
                    key:'tag'
                },{
                    value : 'Actions',
                    key : 'actions'
                }
            ]

        return (
            <ProductSkeleton 
             content={{pageTitle:'Branches'}} AddModal={AddBranch}
             EditModal={EditBranch} ViewModal={ViewBranch} DeleteModal={DeleteBranch}
             tableRowRenderFunc ={BranchListItem}
             headerArr = {headerArr} getTitle={getTitle}
            />
        )
    }
}

export default Products