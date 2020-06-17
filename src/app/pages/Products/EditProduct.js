import React from "react";
import ProductForm from "./ProductForm";

class EditProduct extends React.Component {
    onSubmit = data => {
        this.props.addData(data);
        this.props.closeModal();
    }

    render() {
        return (
            <ProductForm
                label='Add'
                onSubmit={this.onSubmit}
                closeModal={this.props.closeModal}
                {...this.props.record}
            />
        );
    }
}

export default EditProduct;