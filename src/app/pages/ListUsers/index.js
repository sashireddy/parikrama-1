// import React from 'react'
// import Skeleton from '../CrudSkeleton/index'

// // import {actions} from "../../actions/categoryActions";
// import ViewUser from "./ViewUser";

// import {connect} from "react-redux";
// import pageConstants from '../../constants/pages'

// const user = pageConstants.pages.user

// const mapStateToProps = state => ({
//     ...state[user]
// });

// const categoryActions=actions(user)
// const mapActionToProps = {
//     ...categoryActions
// };

// const UserSkeleton = connect(mapStateToProps, mapActionToProps)(Skeleton)

// class User extends React.Component {
    
//     render(){
//         const getTitle = (actionType) => {
//             switch (actionType) {
//                 case "add":
//                     return "Add Users";
//                 case "view":
//                     return "View Users";
//                 case "edit":
//                     return "Edit Users";
//                 case "del":
//                     return "Delete Users";
//                 default:
//                     return "Manage Users";
//             }
//         }
//         const headerArr = [
//             // modal
//             // {
//             //     value : 'id',
//             //     key : '_id',
//             //     sortable : true,
//             //     searchable:true
//             // }
//             ]
            
//         return(
//             <UserSkeleton key="" content={{pageTitle:'User'}}
//             //  AddModal={AddCategory}
//             //  EditModal={EditCategory}
//              ViewModal={ViewUser}
//             //  DeleteModal={DeleteCategory}
//             //  tableRowRenderFunc ={CategoryListItem}
//              headerArr = {headerArr} 
//              getTitle={getTitle}/>
//         )
//     }
// }
// export default User