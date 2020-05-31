import React from "react";
import CategoryForm from "./CategoryForm";

class EditCategory extends React.Component {
    onSubmit = data => {
        const category = {
            ...this.props.category,
            ...data
        };
        this.props.updateData(category);
        this.props.closeModal();
    }

    render() {
        return (
            <CategoryForm
                category={this.props.category}
                label='Update'
                onSubmit={this.onSubmit}
                closeModal={this.props.closeModal}
            />
        );
    }
}

export default EditCategory;