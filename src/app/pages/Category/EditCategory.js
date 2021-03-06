import React from "react";
import CategoryForm from "./CategoryForm";

class EditCategory extends React.Component {
    onSubmit = data => {
        const category = {
            ...this.props.record,
            ...data
        };
        this.props.updateData(category);
        this.props.closeModal();
    }

    render() {
        return (
            <CategoryForm
                record={this.props.record}
                label='Update'
                onSubmit={this.onSubmit}
                closeModal={this.props.closeModal}
            />
        );
    }
}

export default EditCategory;