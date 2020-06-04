import React from 'react'
import Skeleton from './index'
import CategoryListItem from "../../components/category/CategoryListItem";
import {actions} from "../../actions/categoryActions";
import ViewCategory from "../../components/category/ViewCategory";
import EditCategory from "../../components/category/EditCategory";
import AddCategory from "../../components/category/AddCategory";
import DeleteCategory from "../../components/category/DeleteCategory";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state['category']
});

const categoryActions=actions('CATEGORY')
const mapActionToProps = {
    ...categoryActions
};
const CategorySkeleton = connect(mapStateToProps, mapActionToProps)(Skeleton)

export default class Category extends React.Component {
    
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
                    value : 'id',
                    key : '_id',
                    sortable : true,
                    searchable:true
                },{
                    value : 'name',
                    key : 'name',
                    sortable : true,
                    searchable: true
                },{
                    value : 'description',
                    key : 'description'
                },{
                    value : 'Actions',
                    key : 'actions'
                }
            ]
            
        return(
            <CategorySkeleton key="CategoryView124" content={{pageTitle:'Category'}} AddModal={AddCategory}
             EditModal={EditCategory} ViewModal={ViewCategory} DeleteModal={DeleteCategory}
             tableRowRenderFunc ={CategoryListItem}
             headerArr = {headerArr} TableEntries getTitle={getTitle}/>
        )
    }
}