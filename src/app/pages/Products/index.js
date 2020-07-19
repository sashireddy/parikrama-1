import React from 'react'
import {connect} from "react-redux";
import ViewProduct from './ViewProduct'
import EditProduct from './EditProduct'
import DeleteProduct from './DeleteProduct'
import AddProduct from './AddProduct'
import ProductListItem from './ProductListItem'
import Skeleton from '../CrudSkeleton/index'
import ProductActions from '../../actions/productActions'
import {MODULE_INVENTORY} from "../../utils/accessControl";

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
                    return "Add Product";
                case "view":
                    return "View Product";
                case "edit":
                    return "Edit Product";
                case "del":
                    return "Delete Product";
                default:
                    return "Manage Product";
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
                    value : 'Threshold',
                    key : 'threshold'
                },{
                    value : 'units',
                    key : 'units'
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
             moduleName={MODULE_INVENTORY}
            />
        )
    }
}

export default Products