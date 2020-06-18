import React from "react";
import ProductForm from "./ProductForm";

class EditProduct extends React.Component {
    onSubmit = data => {
        const product= {
            ...this.props.record,
            ...data
        };
        this.props.updateData(product);
        this.props.closeModal();
    }

    render() {
        return (
            <ProductForm
                label='update'
                onSubmit={this.onSubmit}
                closeModal={this.props.closeModal}
                record = {this.props.record}
            />
        );
    }
}

export default EditProduct;