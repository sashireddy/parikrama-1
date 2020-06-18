import React from 'react'
import {connect} from "react-redux";
import ViewProduct from './ViewProduct'
import EditProduct from './EditProduct'
import DeleteProduct from './DeleteProduct'
import AddProduct from './AddProduct'
import ProductListItem from './ProductListItem'
import Skeleton from '../CrudSkeleton/index'
import ProductActions from '../../actions/productActions'
const mapStateToProps = state => ({
    ...state["PRODUCTS"],
});

const mapActionToProps = {
    ...ProductActions
};
const ProductSkeleton = connect(mapStateToProps, mapActionToProps)(Skeleton)

class Products extends React.Component {
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
                    value : 'Category',
                    key : 'category'
                },{
                    value : 'Actions',
                    key : 'actions'
                }
            ]
        return (
            <ProductSkeleton 
             content={{pageTitle:'Product'}} AddModal={AddProduct}
             EditModal={EditProduct} ViewModal={ViewProduct} DeleteModal={DeleteProduct}
             tableRowRenderFunc ={ProductListItem}
             headerArr = {headerArr} getTitle={getTitle}
            />
        )
    }
}

export default Products