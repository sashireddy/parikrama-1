import React from "react";
import ProductForm from "./ProductForm";

class AddCategory extends React.Component {
    onSubmit = data => {
        this.props.addData(data);
        this.props.closeModal();
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