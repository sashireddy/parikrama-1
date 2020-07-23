import React from 'react'
import Skeleton from '../CrudSkeleton/index'
import UserListItem from "./UserListItem";
import userActions from "../../actions/userActions";
import ViewUser from "./ViewUser";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import {connect} from "react-redux";
import {MODULE_USER} from "../../utils/accessControl";

const mapStateToProps = state => ({
    ...state["USER"]
});

const mapActionToProps = {
    ...userActions
};
const UserSkeleton = connect(mapStateToProps, mapActionToProps)(Skeleton)

class User extends React.Component {
    render(){
        const getTitle = (actionType) => {
            switch (actionType) {
                case "add":
                    return "Create User";
                case "view":
                    return "View User";
                case "edit":
                    return "Update User";
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
                    value : 'Role',
                    key : 'role'
                },{
                    value : 'Branch',
                    key : 'branch'
                },{
                    value : 'Contact',
                    key : 'contact'
                },{
                    value : 'Status',
                    key : 'isActive'
                },{
                    value : 'Actions',
                    key : 'actions'
                }
            ]

        return (
            <UserSkeleton key="user" content={{pageTitle:'Users'}} AddModal={AddUser}
                EditModal={EditUser} ViewModal={ViewUser} DeleteModal={DeleteUser}
                tableRowRenderFunc ={UserListItem} pk="id"
                headerArr = {headerArr} getTitle={getTitle} moduleName={MODULE_USER}/>
        )
    }
}

export default User;