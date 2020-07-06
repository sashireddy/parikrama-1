import React from "react"
import {Form, Row,Col,Alert} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getLoggedInUserInfo,getProduct} from '../../utils/dataUtils'
import InventoryActions from '../../actions/inventoryActions'
class IssueProduct extends React.Component {
    
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            ...this.props.record,
            productName:getProduct(this.props.record.product).name,
            branch :getLoggedInUserInfo().branch,

           type:"ISSUE_PRODUCT",
           operationalQuantity : 0,
           note : ""
        }
    }

    handleChange = evt => {
        const operationalQuantity = evt.target.value
        if(operationalQuantity >= 0 && operationalQuantity < this.props.record.availableQuantity){
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

    onSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            this.props.createTransaction({...this.state});
        }
        this.props.closeModal();
    }

    render() {
        console.log(this.state)
        const stockAfter = this.props.record.availableQuantity-this.state.operationalQuantity
        return (
            <form className="forms-sample" onSubmit={this.onSubmit} >
                <div className="pl-3 pr-3">
                    <Row>
                        <Col>
                            <h6>Current Stock: {this.props.record.availableQuantity}</h6> 
                        </Col>
                        <Col>
                            <h6>Stock left after transaction: {stockAfter}</h6>
                        </Col>
                    </Row>
                    <Col>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Quantity</label>
                        <Form.Control required type="number" className="form-control" id="operationalQuantity" name="operationalQuantity" placeholder="" value={this.state.operationalQuantity} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please enter a valid quantity</Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>
                        <label htmlFor="">Note</label>
                        <Form.Control required type="text" id="Note" className="form-control" 
                            name="note" placeholder="Add info about the transaction" value={this.state.note}
                            onChange={this.handleNote} />
                        <Form.Control.Feedback type="invalid">Please enter a note about the transaction</Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                    { stockAfter < this.props.record.threshold && (
                    <Row>
                        <Alert variant={'danger'}>
                        your stock will fall below threshold after this transaction
                        </Alert>
                    </Row>
                    )}
                </div>
                <hr className="modal-footer-ruler" />
                <div className="text-right">
                        <button type="button" className="btn btn-light mr-2" onClick={this.props.closeModal}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Disburse Inventory</button>
                </div>
            </form>
        );
    }
}

export default connect(()=>({}),{createTransaction :InventoryActions.createInventoryTransaction})(IssueProduct);