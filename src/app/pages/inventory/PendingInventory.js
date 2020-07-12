import React from 'react'
import {Table,Button, Col,Row,Form} from 'react-bootstrap'
import Select from 'react-select'
import {connect} from 'react-redux'
import {dropDownResponseFromMap} from '../../utils/dropDownUtils'
import Modal from '../../shared/Modal'
import {getLoggedInUserInfo,getBranchInfo} from '../../utils/dataUtils'
import InventoryActions from '../../actions/inventoryActions'
import Spinner from "../../shared/Spinner";

class PendingTransactions extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showAddModal: false
        }
    }
    componentDidMount(){
        this.props.loadPendingTransactions({branch:getLoggedInUserInfo().branch})
    }
   render(){
       let requests = this.props.inventory.pendingTransactions
        return (
        <>
            <Spinner loading={this.props.inventory.pendingTransactionsLoading} />
            <Row>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <Row>
                            <Col><h3>Transaction Requests by other Branches</h3></Col>
                            <Col className="justify-content-end"><Button onClick={()=>this.setState({showAddModal:true})}>Raise Transaction</Button></Col>
                        </Row>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Branch</th>
                                    <th>current Inventory</th>
                                    <th>requested Inventory</th>
                                    <th>note</th>
                                    <th>After Transaction</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {requests.map((request,idx)=>(
                                    <tr key={idx}>
                                        <td>{request.branch}</td>
                                        <td>{request.currentInventory}</td>
                                        <td>{request.requestedInventory}</td>
                                        <td>{request.note}</td>
                                        <td>{request.currentInventory - request.requestedInventory}</td>
                                        <td><Row><Col><Button>Approve Request</Button></Col><Col><Button>Reject Request</Button></Col></Row></td>
                                    </tr>)
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            </Row>
            {/* <Row>
                {this.state.showAddModal && <RaiseTransactionView products={this.props.products} branches={this.props.branches} raiseRequest = {this.props.raiseRequest} closeModal={()=>this.setState({showAddModal:false})}/>}
            </Row> */}
            
        </>
        )
}
}


class RaiseTransactionView extends React.Component {
    constructor(props) {
        super(props);
        const userInfo = getLoggedInUserInfo();
        const branchInfo = getBranchInfo(userInfo.branch)
        this.state = {
            fromBranch: userInfo.branch,
            fromBranchName: branchInfo.name,
            operationalQuantity: 0,
            note: ""
        }
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

    handleProductDropDown = (evt) => {
            this.setState({
                ...this.state,
                productId: evt && evt.value,
                productName: evt && evt.label
            })
    }

    handleBranchDropDown =evt => [
        this.setState({
            ...this.state,
            toBranch: evt && evt.value,
            toBranchName: evt && evt.label
        })
    ]

    onSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false && !this.state.productId && !this.state.toBranch) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            this.props.raiseRequest({...this.state})
            this.props.closeModal();
        }
       
    }
    render(){
    console.log(this.state)
    const productDropdownArr = dropDownResponseFromMap(this.props.products.allRecords)
    const branchDropdownArr = dropDownResponseFromMap(this.props.branches.allRecords)
    return (
        <Modal show={true} closeModal={this.props.closeModal}>
             <form className="forms-sample" onSubmit={this.onSubmit} >
                <div className="pl-3 pr-3">
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Product</label>
                        <Select className="basic-single" classNamePrefix="select"
                            isClearable={true} isSearchable={true}  options={productDropdownArr} onChange={(e)=>{this.handleProductDropDown(e)}}/>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Head Branch</label>
                        <Select className="basic-single" classNamePrefix="select"
                            isClearable={true} isSearchable={true}  options={branchDropdownArr} onChange={(e)=>{this.handleBranchDropDown(e)}}/>
                    </Form.Group>
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
        </Modal>
    )
}
}
const ApproveOrRejectView = props => {
    return (
        <Modal>
        <form className="forms-sample" onSubmit={this.onSubmit} >
           <div className="pl-3 pr-3">
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
   </Modal>
    )
}
export default connect(state=>({
     products: state['PRODUCTS'],
     branches : state['BRANCHES'],
     inventory : state['INVENTORY']
    }),{loadPendingTransactions : InventoryActions.loadPendingTransactions})(PendingTransactions)