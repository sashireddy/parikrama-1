import React from "react"
import {Form, Row,Col,Alert} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getBranchInfo, getLoggedInUserInfo,getProduct} from '../../utils/dataUtils'
import InventoryActions from '../../actions/inventoryActions'
import Select from 'react-select'
import {dropDownResponseFromMap} from '../../utils/dropDownUtils'
import {addNotification} from '../../actions/notification'
import {parseInteger} from '../../utils/commonUtil'
const LocalRequest = "ISSUE_PRODUCT"
const TransferOperation = "TransferOperation"

class IssueProduct extends React.Component {
    
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            ...this.props.record,
            productName:getProduct(this.props.record.product).name,
            fromBranch :getLoggedInUserInfo().branch,
            fromBranchName : getBranchInfo(getLoggedInUserInfo().branch).name,
            type:LocalRequest,
            operationalQuantity : 0,
            note : ""
        }
    }
    validateParams = () => {
        const operationalQuantity = parseInteger(this.state.operationalQuantity)
        if(operationalQuantity > 0 && operationalQuantity <= this.props.record.availableQuantity){
            return true
        }else if(operationalQuantity === 0){
            addNotification({
                title : "Please Check Quantity Parameter",
                message: "Quantity can't be 0",
                type : "warning"
                
            })
        }else if(operationalQuantity > this.props.record.availableQuantity){
            addNotification({
                title : "Please Check Quantity Parameter",
                message: "Quantity can't be greater than available Quantity",
                type : "warning"
            })
        }else if( operationalQuantity < 0){
            addNotification({
                title : "Please Check Quantity Parameter",
                message: "Quantity can't be negative",
                type : "warning"
            })
        }
    }

    transformParamas = () => {
        return {
            ...this.state,
            operationalQuantity : parseInteger(this.state.operationalQuantity)
        }
    }

    handleChange = evt => {
        this.setState({
            ...this.state,
            operationalQuantity: evt.target.value
        });
    }

    handleBranchDropDown =evt => {
        this.setState({
        ...this.state,
        toBranch: evt && evt.value,
        toBranchName: evt && evt.label
        })
    }

    onStatusChange = label => {
            this.setState({
                ...this.state,
                type:label,
            })
    }

    handleNote = evt => {
        this.setState({
            ...this.state,
            note: evt.target.value
        })
    }

    onSubmit = event => {
        const form = event.currentTarget;
        if (!this.validateParams()) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            this.props.createTransaction(this.transformParamas());
        }
        this.props.closeModal();
    }

    render() {
        console.log(this.state)
        const branchDropdownArr = dropDownResponseFromMap(this.props.branches.allRecords).filter(x=>x.label !== this.state.fromBranchName)
        const stockAfter = this.props.record.availableQuantity-this.state.operationalQuantity
        let isAdminBranch = getBranchInfo(getLoggedInUserInfo().branch).isHeadOffice
        return (
            <form className="forms-sample" onSubmit={this.onSubmit} >
                <div className="pl-3 pr-3">
                    <div className="IssueForm">
                    <Form.Group>
                        <label htmlFor="isHeadOffice">Request Type</label>
                        <Form.Check type="radio" id={LocalRequest} name={LocalRequest} value={LocalRequest} 
                            label="Disburse Inventory Locally" checked={this.state.type === LocalRequest}
                            onChange={()=>this.onStatusChange(LocalRequest)} />
                        {isAdminBranch && <Form.Check type="radio" id={TransferOperation} name ={TransferOperation} value={TransferOperation} 
                            label="Move Inventory To Another Branch" checked={this.state.type === TransferOperation}
                            onChange={()=>this.onStatusChange(TransferOperation)}
                            />}
                    </Form.Group>
                    {this.state.type === TransferOperation &&<Form.Group>
                        <label htmlFor="exampleInputEmail1">To Branch</label>
                        <Select className="basic-single" classNamePrefix="select"
                            isClearable={true} isSearchable={true}  options={branchDropdownArr} onChange={(e)=>{this.handleBranchDropDown(e)}}/>
                    </Form.Group>}
                    <Row>
                        <Col>
                            <h6 className="headerValue">Current Stock</h6> 
                            <h6 className="Value">{this.props.record.availableQuantity}</h6>
                        </Col>
                        <Col>
                        <h6 className="headerValue">Stock left after transaction</h6>
                            <h6 className="Value">{stockAfter}</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <h6 className="headerValue">
                                Product
                            </h6>
                            <h6 className="Value">{this.props.record.productName}</h6>
                        </Col>
                        <Col>
                        <h6 className="headerValue">Threshold</h6>
                            <h6 className="Value">{this.props.record.threshold}</h6>
                        </Col>
                    </Row>
                    </div>
                    <Row>
                        <Col>
                        <Form.Group>
                        <label htmlFor="exampleInputEmail1">Quantity</label>
                        <Form.Control required type="number" className="form-control" id="operationalQuantity" name="operationalQuantity" placeholder="" value={this.state.operationalQuantity} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please enter a valid quantity</Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                    <Form.Group>
                        <label htmlFor="">Note</label>
                        <Form.Control required type="text" id="Note" className="form-control" 
                            name="note" placeholder="Add info about the transaction" value={this.state.note}
                            onChange={this.handleNote} />
                        <Form.Control.Feedback type="invalid">Please enter a note about the transaction</Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                    </Row>
                    { stockAfter < this.props.record.threshold && (
                    <Row>
                        <Col>
                        <Alert variant={'danger'}>
                        your stock will fall below threshold after this transaction
                        </Alert>
                        </Col>
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

export default connect((state)=>({branches : state['BRANCHES']}),{createTransaction :InventoryActions.createInventoryTransaction})(IssueProduct);