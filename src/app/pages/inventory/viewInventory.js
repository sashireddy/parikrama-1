import React from "react"
import {Form, Row,Col,Alert} from 'react-bootstrap'
import {connect} from 'react-redux'
import inventoryActions from '../../actions/inventoryActions'


const mapStateToProps = state => ({
    THRESHOLD : state['THRESHOLD']
})
const mapActionToProps = () => {
    return {
        ...inventoryActions
    }
}
class ViewCategory extends React.Component {
    
    constructor(){
        super();
        this.state = {
        }
    }

    handleChange = evt => {
            this.setState({
                ...this.state,
                note: evt.target.value
            });
        // }
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
        console.log(this.props)
        return (
            <form className="forms-sample" onSubmit={this.onSubmit} >
                <div className="pl-3 pr-3">
                    
                    <Row>
                        <Col>
                            <h6>Current Stock : {this.props.record.balance}</h6> 
                        </Col>                        
                    </Row>
                    <Row>
                        <Alert variant={'danger'}>
                        your stock will fall below threshold after this transaction
                        </Alert>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <label htmlFor="exampleInputEmail1">Quantity</label>
                                <Form.Control required type="number" className="form-control" id="categoryName" name="name" placeholder="" value={this.state.inputQuantity} onChange={this.handleChange} />
                                <Form.Control.Feedback type="invalid">Please enter a valid quantity</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Col>
                    </Col>
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


export default connect(mapStateToProps, mapActionToProps)(ViewCategory);