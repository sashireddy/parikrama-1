import React from "react"
import {Form} from 'react-bootstrap'
import Select from 'react-select'
import {connect} from 'react-redux'
import {dropDownResponseFromMap} from '../../utils/dropDownUtils'
import {getLoggedInUserInfo} from '../../utils/dataUtils'
import InventoryActions from '../../actions/inventoryActions'

const mapStateToProps = state => ({
    products: state['PRODUCTS']
})

class AddCategory extends React.Component {
    
    constructor(){
        super();
        this.state = {
            branch: getLoggedInUserInfo().branch,
           type:"ADD_PRODUCT",
           operationalQuantity : 0,

        }
    }

    componentDidMount(){
        this.setState({...this.props.category});
    }

    handleChange = evt => {
        const operationalQuantity = parseInt(evt.target.value)
        if(operationalQuantity){
            this.setState({
                ...this.state,
                operationalQuantity
            });
        }
    }
    handleNote = evt => {
        this.setState({
            ...this.state,
            note: evt.target.value
        })
    }

    handleDropDown = (evt) => {
            this.setState({
                ...this.state,
                product: evt && evt.value,
                productName: evt && evt.label
            })
    }

    onSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false && !this.state.currentProduct) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            this.props.createTransaction({...this.state});
            this.props.closeModal();
        }
       
    }

    // handleProductDropDown = evt => {
    //     this.setState({
    //         currentProduct: evt.this.props.products..filter(product =>evt[0]===product.name)[0],
    //     })
    // }

    render() {
        console.log(this.state)
        const productDropdownArr = dropDownResponseFromMap(this.props.products.allRecords)
        return (
            <form className="forms-sample" onSubmit={this.onSubmit} >
                <div className="pl-3 pr-3">
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Product</label>
                        <Select className="basic-single" classNamePrefix="select"
                            isClearable={true} isSearchable={true}  options={productDropdownArr} onChange={(e)=>{this.handleDropDown(e)}}/>
                    </Form.Group>
                    {   this.state.currentProduct && (<>
                        <dt>Category</dt>
                        <dd>{this.state.currentProduct.category}</dd>
                        </>)
                    }
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Quantity</label>
                        <Form.Control required type="number" className="form-control" id="operationalQuantity" name="operationalQuantity" placeholder="" value={this.state.operationalQuantity} onChange={this.handleChange} />
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

export default connect(mapStateToProps,{createTransaction :InventoryActions.createInventoryTransaction})(AddCategory);