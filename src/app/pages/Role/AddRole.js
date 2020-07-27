import React from "react";
import CategoryForm from "./RoleForm";

class AddCategory extends React.Component {
    onSubmit = data => {
        this.props.addData(data);
        this.props.closeModal();
    }

    render() {
        return (
            <CategoryForm
                label='Create'
                onSubmit={this.onSubmit}
                closeModal={this.props.closeModal}
            />
        );
    }
}

export default AddCategory;