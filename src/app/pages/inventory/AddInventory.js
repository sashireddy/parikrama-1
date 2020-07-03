import React from "react"
import {Form,Row} from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import {connect} from 'react-redux'

const mapStateToProps = state => ({
    products: state['PRODUCTS']
})

class AddCategory extends React.Component {
    
    constructor(){
        super();
        this.state = {
           inputQuantity : 0,

        }
    }

    componentDidMount(){
        this.setState({...this.props.category});
    }

    handleChange = evt => {
        this.setState({
            ...this.state,
            inputQuantity: evt.target.value
        });
    }
    handleNote = evt => {
        this.setState({
            ...this.state,
            note: evt.target.value
        })
    }

    handleDropDown = (evt,dropDown) => {
        this.setState({
            [dropDown] : evt
        })
    }

    onSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false && !this.state.currentProduct) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            this.props.addData({...this.state});
            this.props.closeModal();
        }
       
    }

    handleProductDropDown = evt => {
        this.setState({
            currentProduct: this.props.products.allRecords.filter(product =>evt[0]===product.name)[0],
        })
    }

    render() {
        console.log(this.props)
        return (
            <form className="forms-sample" onSubmit={this.onSubmit} >
                <div className="pl-3 pr-3">
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Product</label>
                        <Typeahead 
                            id="Products"
                            key='1'
                            options={this.props.products.allRecords.filter(record => record.isActive).map(record => record.name)}
                            onChange={this.handleProductDropDown}
                        />
                    </Form.Group>
                    {   this.state.currentProduct && (<>
                        <dt>Category</dt>
                        <dd>{this.state.currentProduct.category}</dd>
                        </>)
                    }
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Quantity</label>
                        <Form.Control required type="number" className="form-control" id="categoryName" name="name" placeholder="" value={this.state.inputQuantity} onChange={this.handleChange} />
                        <dd>{this.state.currentProduct && this.state.currentProduct.unit}</dd>
                        <Form.Control.Feedback type="invalid">Please enter a valid quantity</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="">Note</label>
                        <Form.Control required type="text" id="Note" className="form-control" 
                            name="note" placeholder="Add info about the transaction" value={this.state.note}
                            onChange={this.handleNote} />
                        <Form.Control.Feedback type="invalid">Please enter a note about the transaction</Form.Control.Feedback>
                    </Form.Group>
                    <hr className="modal-footer-ruler" />
                    <div className="text-right">
                        <button type="button" className="btn btn-light mr-2" onClick={this.props.closeModal}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Inventory</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default connect(mapStateToProps,{})(AddCategory);