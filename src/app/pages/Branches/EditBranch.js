import React from "react";
import BranchForm from "./BranchForm";

class EditBranch extends React.Component {
    onSubmit = data => {
        this.props.updateData(data);
        this.props.closeModal();
    }

    render() {
        console.log(this.props)
        return (
            <BranchForm
                label='Add'
                onSubmit={this.onSubmit}
                closeModal={this.props.closeModal}
                record={this.props.record}
            />
        );
    }
}

export default EditBranch;