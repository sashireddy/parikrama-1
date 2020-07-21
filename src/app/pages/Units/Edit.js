import React from "react";
import ProductForm from "./Form";
import UnitAction from '../../actions/units'
import Store from '../../store'

class EditProduct extends React.Component {
    onSubmit = data => {
        const product= {
            ...this.props.record,
            ...data
        };
        Store.dispatch(UnitAction.updateData(product));
        this.props.closeModal();
    }

    render() {
        return (
            <ProductForm
                label='update'
                onSubmit={this.onSubmit}
                closeModal={this.props.closeModal}
                record = {this.props.record}
            />
        );
    }
}

export default EditProduct;