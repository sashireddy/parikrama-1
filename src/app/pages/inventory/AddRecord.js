import React from "react"
import {Form, Row,Col,Alert} from 'react-bootstrap'
import Select from 'react-select'

const selectedProduct = {
    name : 'pens',
    alertAmount : 10,
    currentQuantity : 100,
    units : 'units'
}

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

    handleDropDown = (evt,dropDown) => {
        this.setState({
            [dropDown] : evt
        })
    }

    onSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            this.props.onSubmit({...this.state});
        }
        this.props.closeModal();
    }

    handleProductDropDown = evt => {
        this.setState({
            currentProduct: evt[0],
            selectedProduct
        })
    }

    render() {
        console.log(this.state)
        let stockAfter = 0
        if(this.state.selectedProduct){
            stockAfter = this.state.selectedProduct.currentQuantity-this.state.inputQuantity
        }
        return (
            <form className="forms-sample" onSubmit={this.onSubmit} >
                <div className="pl-3 pr-3">
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Product</label>
                        <Select />
                    </Form.Group>
                    { this.state.selectedProduct && (<>
                    <Row>
                        <Col>
                            <h6>Current Stock: {this.state.selectedProduct.currentQuantity}</h6> 
                        </Col>
                        <Col>
                            <h6>Stock left after transaction: {stockAfter}</h6>
                        </Col>
                    </Row>
                    { stockAfter < this.state.selectedProduct.alertAmount && (
                    <Row>
                        <Alert variant={'danger'}>
                        your stock will fall below threshold after this transaction
                        </Alert>
                    </Row>
                    )}
                    <Col>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Quantity</label>
                        <Form.Control required type="number" className="form-control" id="categoryName" name="name" placeholder="" value={this.state.inputQuantity} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please enter a valid quantity</Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                        </>)}
                </div>
            </form>
        );
    }
}

export default AddCategory;