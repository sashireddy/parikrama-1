import React from "react"
import {Form, Row,Col,Alert} from 'react-bootstrap'
import Select from 'react-select'

class AddCategory extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            ...this.props.record,
           inputQuantity : 0,
           note : ""
        }
    }

    handleChange = evt => {
        const inputQuantity = evt.target.value
        if(inputQuantity >= 0 && inputQuantity < this.props.record.threshold){
            this.setState({
                ...this.state,
                inputQuantity
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
            this.props.onSubmit({...this.state});
        }
        this.props.closeModal();
    }

    render() {
        console.log(this.state)
        const stockAfter = this.props.record.availableQuantity-this.state.inputQuantity
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
                        <Form.Control required type="number" className="form-control" id="categoryName" name="name" placeholder="" value={this.state.inputQuantity} onChange={this.handleChange} />
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

export default AddCategory;