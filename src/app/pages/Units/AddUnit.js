import React from "react";
import UnitForm from "./UnitForm";
import {validateName}  from '../../utils/dataUtils'
class AddCategory extends React.Component {
    onSubmit = data => {
        if(validateName("UNIT",data.name)){
            this.props.addData(data);
            this.props.closeModal();
        }
    }

    render() {
        return (
            <UnitForm
                label='Create'
                onSubmit={this.onSubmit}
                closeModal={this.props.closeModal}
            />
        );
    }
}



export default AddCategory;