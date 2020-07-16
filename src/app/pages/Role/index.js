import React from 'react'
import Skeleton from '../CrudSkeleton/index'
import RoleListItem from "./RoleListItem";
import roleActions from "../../actions/roleActions";
import ViewRole from "./ViewRole";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state["ROLE"]
});

const mapActionToProps = {
    ...roleActions
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
                    key : 'name',
                    sortable : true,
                    searchable: true
                },{
                    value : 'Description',
                    key : 'description'
                },{
                    value : 'Status',
                    key : 'isActive'
                }
            ]

        return (
            <RoleSkeleton key="role" content={{pageTitle:'Role'}}
             ViewModal={ViewRole}
             tableRowRenderFunc ={RoleListItem} pk="id"
             headerArr = {headerArr} getTitle={getTitle}/>
        )
    }
}

export default Role;