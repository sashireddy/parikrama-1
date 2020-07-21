import React from 'react'
import {Table,Button, Col,Row} from 'react-bootstrap'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getLoggedInUserInfo} from '../../utils/dataUtils'
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
                <td>{request.toBranchName}</td>
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
        acceptOrRejectTransaction : InventoryActions.acceptOrRejectExtRequest
    })(PendingTransactions)