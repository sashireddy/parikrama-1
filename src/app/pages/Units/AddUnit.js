import React from "react";
import UnitForm from "./UnitForm";

class AddCategory extends React.Component {
    onSubmit = data => {
        this.props.addData(data);
        this.props.closeModal();
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