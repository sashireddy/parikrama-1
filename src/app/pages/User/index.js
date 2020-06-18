import React from 'react'
import Skeleton from '../CrudSkeleton/index'
import UserListItem from "./UserListItem";
import userActions from "../../actions/userActions.js";
import ViewUser from "./ViewUser";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state["USER"]
});

const mapActionToProps = {
    ...userActions
};
const UserSkeleton = connect(mapStateToProps, mapActionToProps)(Skeleton)

class Role extends React.Component {
    render(){
        const getTitle = (actionType) => {
            switch (actionType) {
                case "add":
                    return "Add User";
                case "view":
                    return "View User";
                case "edit":
                    return "Edit User";
                case "del":
                    return "Delete User";
                default:
                    return "Manage User";
            }
        }
        const headerArr = [
                {
                    value : 'Name',
                    key : 'firstName',
                    sortable : true,
                    searchable: true
                },{
                    value : 'Email',
                    key : 'email'
                },{
                    value : 'Status',
                    key : 'isActive'
                },{
                    value : 'Phone No',
                    key : 'contact'
                },{
                    value : 'Actions',
                    key : 'actions'
                }
            ]

        return (
            <UserSkeleton key="role" content={{pageTitle:'Role'}} AddModal={AddUser}
                EditModal={EditUser} ViewModal={ViewUser} DeleteModal={DeleteUser}
                tableRowRenderFunc ={UserListItem}
                headerArr = {headerArr} getTitle={getTitle}/>
        )
    }
}

export default Role;