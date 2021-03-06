import React from "react";
import RoleForm from "./RoleForm";

class EditRole extends React.Component {
    onSubmit = data => {
        const role = {
            ...this.props.record,
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