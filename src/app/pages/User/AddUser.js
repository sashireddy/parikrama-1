import React from "react";
import UserForm from "./UserForm";

class AddCategory extends React.Component {
    onSubmit = data => {
        this.props.addData(data);
        this.props.closeModal();
    }

    render() {
        return (
            <UserForm
                label='Create'
                onSubmit={this.onSubmit}
                closeModal={this.props.closeModal}
            />
        );
    }
}

export default AddCategory;