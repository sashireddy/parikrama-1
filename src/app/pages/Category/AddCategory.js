import React from "react";
import CategoryForm from "./CategoryForm";
import {validateName}  from '../../utils/dataUtils'
class AddCategory extends React.Component {
    onSubmit = data => {
        if(validateName("CATEGORY",data.name)){
            this.props.addData(data);
            this.props.closeModal();
        }
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