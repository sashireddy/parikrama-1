import React from "react";
import ProductForm from "./ProductForm";
import {validateName} from '../../utils/dataUtils'
class AddCategory extends React.Component {
    onSubmit = data => {
        if(validateName("PRODUCT",data.name)){
        this.props.addData(data);
        this.props.closeModal();
        }
    }

    render() {
        return (
            <ProductForm
                label='Create'
                onSubmit={this.onSubmit}
                closeModal={this.props.closeModal}
            />
        );
    }
}

export default AddCategory;