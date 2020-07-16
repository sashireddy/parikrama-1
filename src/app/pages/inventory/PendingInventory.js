import React from 'react'
import {Table,Button, Col,Row,Form} from 'react-bootstrap'
import Select from 'react-select'
import {connect} from 'react-redux'
import {dropDownResponseFromMap} from '../../utils/dropDownUtils'
import Modal from '../../shared/Modal'
import {getLoggedInUserInfo,getBranchInfo} from '../../utils/dataUtils'
import InventoryActions from '../../actions/inventoryActions'
import Spinner from "../../shared/Spinner";
import Accept from './viewInventory'
import dateFormat from "dateformat";
class PendingTransactions extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            selectedRecord : null
        }
    }
    componentDidMount(){
        this.props.loadPendingTransactions({branch:getLoggedInUserInfo().branch})
    }
    updateRecordAndOpenModal = (record)=> {
        this.setState({
            selectedRecord : record,
            showModal : true
        })
    }
    closeModalAndDeleteRecord = () => {
        this.setState({
            showModal : false,
            selectedRecord : null
        })
    }
   render(){
       const rowRender = (request,idx)=>(
            <tr key={idx}>
                <td>{dateFormat(request.date, "yyyy-mm-dd") }</td>
                <td>{request.user}</td>
                <td>{request.fromBranchName}</td>
                <td>{request.productName}</td>
                <td>{request.operationalQuantity}</td>
                <td>{request.note}</td>
                <td><Row><Col><Button onClick={()=>this.updateRecordAndOpenModal(request)}>Respond</Button></Col></Row></td>
            </tr>)
       let requests = this.props.inventory.pendingTransactions || []
        return (
        <>
            <Spinner loading={this.props.inventory.pendingTransactionsLoading} />
            <Row>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <Row>
                            <Col><h3>Transaction Requests by other Branches</h3></Col>
                        </Row>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>User</th>
                                    <th>Branch</th>
                                    <th>Product</th>
                                    <th>Requested Quantity</th>
                                    <th>note</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {requests.length ?
                                            requests.map((record,idx)=> rowRender(record,idx))
                                            : <tr><td colSpan={6} className="text-center">No Records found!</td></tr>
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            </Row>
            <Row>
                {this.state.showModal && <Accept 
                    products={this.props.products} branches={this.props.branches} 
                    inventory = {this.props.inventory}
                    acceptOrRejectTransaction = {this.props.acceptOrRejectTransaction}
                    closeModal={()=>this.setState({showModal:false})}
                    record = {this.state.selectedRecord}
                    />}
            </Row>
            
        </>
        )
}
}


// class RaiseTransactionView extends React.Component {
//     constructor(props) {
//         super(props);
//         const userInfo = getLoggedInUserInfo();
//         const branchInfo = getBranchInfo(userInfo.branch)
//         this.state = {
//             fromBranch: userInfo.branch,
//             fromBranchName: branchInfo.name,
//             operationalQuantity: 0,
//             note: ""
//         }
//     }
//     handleChange = evt => {
//         const operationalQuantity = parseInt(evt.target.value)
//         if(operationalQuantity){
//             this.setState({
//                 ...this.state,
//                 operationalQuantity
//             });
//         }
//     }
//     handleNote = evt => {
//         this.setState({
//             ...this.state,
//             note: evt.target.value
//         })
//     }

//     handleProductDropDown = (evt) => {
//             this.setState({
//                 ...this.state,
//                 productId: evt && evt.value,
//                 productName: evt && evt.label
//             })
//     }

//     handleBranchDropDown =evt => [
//         this.setState({
//             ...this.state,
//             toBranch: evt && evt.value,
//             toBranchName: evt && evt.label
//         })
//     ]

//     onSubmit = event => {
//         const form = event.currentTarget;
//         if (form.checkValidity() === false && !this.state.productId && !this.state.toBranch) {
//             event.preventDefault();
//             event.stopPropagation();
//         }else {
//             event.preventDefault();
//             this.props.raiseRequest({...this.state})
//             this.props.closeModal();
//         }
       
//     }
//     render(){
//     console.log(this.state)
//     const productDropdownArr = dropDownResponseFromMap(this.props.products.allRecords)
//     const branchDropdownArr = dropDownResponseFromMap(this.props.branches.allRecords)
//     return (
//         <Modal show={true} closeModal={this.props.closeModal}>
//              <form className="forms-sample" onSubmit={this.onSubmit} >
//                 <div className="pl-3 pr-3">
//                     <Form.Group>
//                         <label htmlFor="exampleInputEmail1">Product</label>
//                         <Select className="basic-single" classNamePrefix="select"
//                             isClearable={true} isSearchable={true}  options={productDropdownArr} onChange={(e)=>{this.handleProductDropDown(e)}}/>
//                     </Form.Group>
//                     <Form.Group>
//                         <label htmlFor="exampleInputEmail1">Head Branch</label>
//                         <Select className="basic-single" classNamePrefix="select"
//                             isClearable={true} isSearchable={true}  options={branchDropdownArr} onChange={(e)=>{this.handleBranchDropDown(e)}}/>
//                     </Form.Group>
//                     <Form.Group>
//                         <label htmlFor="exampleInputEmail1">Quantity</label>
//                         <Form.Control required type="number" className="form-control" id="operationalQuantity" name="operationalQuantity" placeholder="" value={this.state.operationalQuantity} onChange={this.handleChange} />
//                         <dd>{this.state.currentProduct && this.state.currentProduct.unit}</dd>
//                         <Form.Control.Feedback type="invalid">Please enter a valid quantity</Form.Control.Feedback>
//                     </Form.Group>
//                     <Form.Group>
//                         <label htmlFor="">Note</label>
//                         <Form.Control required type="text" id="Note" className="form-control" 
//                             name="note" placeholder="Add info about the transaction" value={this.state.note}
//                             onChange={this.handleNote} />
//                         <Form.Control.Feedback type="invalid">Please enter a note about the transaction</Form.Control.Feedback>
//                     </Form.Group>
//                     <hr className="modal-footer-ruler" />
//                     <div className="text-right">
//                         <button type="button" className="btn btn-light mr-2" onClick={this.props.closeModal}>Cancel</button>
//                         <button type="submit" className="btn btn-primary">Add Inventory</button>
//                     </div>
//                 </div>
//             </form>
//         </Modal>
//     )
// }
// }


// class ApproveOrRejectView extends React.Component {
//     render(){
//     return (
//         <Modal show={this.props.show}>
//         <form className="forms-sample" onSubmit={this.onSubmit} >
//            <div className="pl-3 pr-3">
//                <Form.Group>
//                    <label htmlFor="exampleInputEmail1">Quantity</label>
//                    <Form.Control required type="number" className="form-control" id="operationalQuantity" name="operationalQuantity" placeholder="" value={this.state.operationalQuantity} onChange={this.handleChange} />
//                    <dd>{this.state.currentProduct && this.state.currentProduct.unit}</dd>
//                    <Form.Control.Feedback type="invalid">Please enter a valid quantity</Form.Control.Feedback>
//                </Form.Group>
//                <Form.Group>
//                    <label htmlFor="">Note</label>
//                    <Form.Control required type="text" id="Note" className="form-control" 
//                        name="note" placeholder="Add info about the transaction" value={this.state.note}
//                        onChange={this.handleNote} />
//                    <Form.Control.Feedback type="invalid">Please enter a note about the transaction</Form.Control.Feedback>
//                </Form.Group>
//                <hr className="modal-footer-ruler" />
//                <div className="text-right">
//                    <button type="button" className="btn btn-light mr-2" onClick={this.props.closeModal}>Cancel</button>
//                    <button type="submit" className="btn btn-primary">Add Inventory</button>
//                </div>
//            </div>
//        </form>
//    </Modal>
//     )
// }
// }

export default connect(state=>({
     products: state['PRODUCTS'],
     branches : state['BRANCHES'],
     inventory : state['INVENTORY']
    }),{
        loadPendingTransactions : InventoryActions.loadPendingTransactions,
        acceptOrRejectTransaction : InventoryActions.acceptOrRejectExtRequest
    })(PendingTransactions)