import React from "react";
import BranchForm from "./BranchForm";
import {validateName} from '../../utils/dataUtils'
class AddCategory extends React.Component {
    onSubmit = data => {
        if(validateName("BRANCH",data.name)){
            this.props.addData(data);
            this.props.closeModal();
        }
    }

    render() {
        return (
            <BranchForm
                label='Create'
                onSubmit={this.onSubmit}
                closeModal={this.props.closeModal}
            />
        );
    }
}

export default AddCategory;