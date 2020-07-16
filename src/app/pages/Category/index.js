import React from 'react'
import Skeleton from '../CrudSkeleton/index'
import CategoryListItem from "./CategoryListItem";
import categoryActions from "../../actions/categoryActions";
import ViewCategory from "./ViewCategory";
import EditCategory from "./EditCategory";
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";
import {connect} from "react-redux";
import {MODULE_INVENTORY} from "../../utils/accessControl";

const mapStateToProps = state => ({
    ...state['CATEGORY']
});

const mapActionToProps = {
    ...categoryActions
};
const CategorySkeleton = connect(mapStateToProps, mapActionToProps)(Skeleton)

class Category extends React.Component {

    render(){
        const getTitle = (actionType) => {
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
                },{
                    value : 'Actions',
                    key : 'actions'
                }
            ]

        return (
            <CategorySkeleton content={{pageTitle:'Category'}} AddModal={AddCategory}
             EditModal={EditCategory} ViewModal={ViewCategory} DeleteModal={DeleteCategory}
             tableRowRenderFunc ={CategoryListItem} pk="id"
             headerArr = {headerArr} getTitle={getTitle} moduleName={MODULE_INVENTORY}>
            </CategorySkeleton>
        )
    }
}
export default Category