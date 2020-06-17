import React from "react";
import BranchForm from "./BranchForm";

class EditBranch extends React.Component {
    onSubmit = data => {
        this.props.addData(data);
        this.props.closeModal();
    }

    render() {
        return (
            <BranchForm
                label='Add'
                onSubmit={this.onSubmit}
                closeModal={this.props.closeModal}
                {...this.props.record}
            />
        );
    }
}

export default EditBranch;