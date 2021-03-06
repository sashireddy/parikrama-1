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
                    return "Create Product";
                case "view":
                    return "View Product";
                case "edit":
                    return "Update Product";
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
                    key : 'categoryName',
                    sortable : true,
                    searchable: true
                },{
                    value : 'Threshold',
                    key : 'threshold'
                },{
                    value : 'Units',
                    key : 'unitName'
                },{
                    value : 'Status',
                    key : 'isActive'
                },{
                    value : 'Actions',
                    key : 'actions'
                }
            ]
        return (
            <ProductSkeleton
             customClass="products_page"
             content={{
                 pageTitle:'Products',
                 addButton: 'New Product'
                }} AddModal={AddProduct}
             EditModal={EditProduct} ViewModal={ViewProduct} DeleteModal={DeleteProduct}
             tableRowRenderFunc ={ProductListItem}
             headerArr = {headerArr} getTitle={getTitle}
             moduleName={MODULE_INVENTORY}
             pk="id"
            />
        )
    }
}

export default Products