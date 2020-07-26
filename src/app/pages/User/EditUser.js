import React from "react";
import RoleForm from "./UserForm";

class EditRole extends React.Component {
    onSubmit = data => {
        const role = {
            id: this.props.record.id,
            ...data
        };
        this.props.updateData(role);
        this.props.closeModal();
    }

    render() {
        return (
            <RoleForm
                record={this.props.record}
                label='Update'
                onSubmit={this.onSubmit}
                closeModal={this.props.closeModal}
            />
        );
    }
}

export default EditRole ;