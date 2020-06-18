import React from 'react'
import Skeleton from '../CrudSkeleton/index'
import RoleListItem from "./RoleListItem";
import userActions from "../../actions/userActions";
import ViewRole from "./ViewRole";
import EditRole from "./EditRole";
import AddRole from "./AddRole";
import DeleteRole from "./DeleteRole";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state["ROLE"],
    ...state["PERMISSION"]
});

const mapActionToProps = {
    ...userActions
};
const RoleSkeleton = connect(mapStateToProps, mapActionToProps)(Skeleton)

class Role extends React.Component {
    render(){
        const getTitle = (actionType) => {
            switch (actionType) {
                case "add":
                    return "Add Role";
                case "view":
                    return "View Role";
                case "edit":
                    return "Edit Role";
                case "del":
                    return "Delete Role";
                default:
                    return "Manage Role";
            }
        }
        const headerArr = [
                {
                    value : 'Name',
                    key : 'label',
                    sortable : true,
                    searchable: true
                },{
                    value : 'Description',
                    key : 'description'
                },{
                    value : 'Status',
                    key : 'isActive'
                },{
                    value : 'Actions',
                    key : 'actions'
                }
            ]

        return (
            <RoleSkeleton key="role" content={{pageTitle:'Role'}} AddModal={AddRole}
             EditModal={EditRole} ViewModal={ViewRole} DeleteModal={DeleteRole}
             tableRowRenderFunc ={RoleListItem}
             headerArr = {headerArr} getTitle={getTitle}/>
        )
    }
}

export default Role;