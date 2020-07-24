import React from 'react'
import {Table,Button, Col,Row} from 'react-bootstrap'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getBranch, getLoggedInUserInfo} from '../../utils/dataUtils'
import InventoryActions from '../../actions/inventoryActions'
import Spinner from "../../shared/Spinner";
import Accept from './viewInventory'
import dateFormat from "dateformat";
import isAllowed,{MODULE_INVENTORY,ACTION_MANAGE} from '../../utils/accessControl'

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
    rejectCall = (record) => {
        let toBranch
        Object.keys(this.props.branches.allRecords).forEach(x => {
            if(this.props.branches.allRecords[x].name === record.toBranchName) {
                toBranch = x
            } 
        })
        this.props.rejectRequest({
            "fromBranch": getLoggedInUserInfo().branch,
	        "toBranch": toBranch,
	        "fromBranchName": getBranch(getLoggedInUserInfo().branch).name,
	        "toBranchName": record.toBranchName,
	        "product": record.product,
	        "productName": record.productName,
            // "operationalQuantity": record.operationalQuantity,  
	        "pendingRequestsId": record.id
        })
    }
    closeModalAndDeleteRecord = () => {
        this.setState({
            showModal : false,
            selectedRecord : null
        })
    }
   render(){
        const isHeadOffice = getBranch(getLoggedInUserInfo().branch).isHeadOffice
        const rowRender = (request,idx)=>{
           
           return (
            <tr key={idx}>
                <td>{dateFormat(request.date, "yyyy-mm-dd") }</td>
                <td>{request.user}</td>
                {isHeadOffice && <td>{request.fromBranchName}</td>}
                {!isHeadOffice && <td>{request.toBranchName}</td>}
                <td>{request.productName}</td>
                <td>{request.operationalQuantity}</td>
                <td>{request.note}</td>
                {isHeadOffice &&<td>
                    <Row>
                        <Col><Button onClick={()=>this.updateRecordAndOpenModal(request)}>Accept</Button></Col>
                        <Col><Button onClick={()=>this.rejectCall(request)}>Reject</Button></Col>
                    </Row>
                </td>}
                {!isHeadOffice && 
                    <Row>
                        <Button onClick={()=>{}}>Cancel</Button>
                    </Row>
                }
            </tr>)}
       let requests = this.props.inventory.pendingTransactions || []
       
       if(!isAllowed(ACTION_MANAGE,MODULE_INVENTORY)) return <></>
        return (
            <>
            <Spinner loading={this.props.inventory.pendingTransactionsLoading} />
            <Row>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <Row>
                            {isHeadOffice &&<Col><h3 className="page-title paddedLine">Transaction Requests by other Branches</h3></Col>}
                            {!isHeadOffice &&<Col><h3 className="page-title paddedLine">Pending transactions</h3></Col>}
                        </Row>
                        <Table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>User</th>
                                    <th>Branch</th>
                                    <th>Product</th>
                                    <th>Requested Quantity</th>
                                    <th>Note</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {requests.length ?
                                            requests.map((record,idx)=> rowRender(record,idx))
                                            : <tr><td colSpan={7} className="text-center">No Records found!</td></tr>
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
export default connect(state=>({
     products: state['PRODUCTS'],
     branches : state['BRANCHES'],
     inventory : state['INVENTORY']
    }),{
        loadPendingTransactions : InventoryActions.loadPendingTransactions,
        acceptOrRejectTransaction : InventoryActions.acceptOrRejectExtRequest,
        rejectRequest : InventoryActions.rejectInventoryRequest
    })(PendingTransactions)