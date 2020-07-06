import React from 'react'
import CrudSkeleton from '../CrudSkeleton/index'
import InventoryActions from '../../actions/inventoryActions'
import AddInventory from './AddInventory'
import ViewInventory from './IssueRecord'
import {Table,Button, Col,Row} from 'react-bootstrap'
import {
    connect,
    // dispatch
} from "react-redux";
import {getUnit,getCategory,getProduct} from '../../utils/dataUtils'


const requests = [{
    id:'requestId-1',
    branch:'Kormangla',
    currentInventory : 300,
    note: 'need this to distribute this month',
    requestedInventory : 30,

}]

const mapStateToProps = state => ({
    state:{...state},
    ...state['INVENTORY']
});

console.log(InventoryActions)

const mapActionToProps = {
    getData : InventoryActions.getData,
    addData : InventoryActions.addData,
};
const InventorySkeleton = CrudSkeleton


class Inventory extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            currentCategory: null,
            actionType: null,
        }
    }

    componentDidMount(){
        //add other dependencies here 
        // dispatch(loadBranchData())        
    }

    render() {
        const getTitle = (actionType) => {
            switch (actionType) {
                case "add":
                    return "Add Inventory Locally";
                case "view":
                    return "Dispurse Inventory";
                case "edit":
                    return "Edit Inventory";
                case "del":
                    return "Delete Inventory";
                default:
                    return "Manage Inventory";
            }
        }
        const headerArr = [
            {
                value: 'category',
                key: 'category',
            },{
                value: 'product',
                key: 'product',
            },{
                value: 'Available Quantity',
                key: 'availableQuantity',
            },
            {
                value:'actions',
                key:'actions'
            }
            ]
        const RowRender = (props) => {
            const product = getProduct(props.record.product)
            return (
                <tr>
                    <td>{getCategory(product.category).name}</td>
                    <td>{product.name}</td>
                    <td> { props.record.availableQuantity > props.record.threshold ? 
                        <label className="badge badge-success">{props.record.availableQuantity}  {getUnit(product.unit).name}</label> :
                        <label className="badge badge-warning">{props.record.availableQuantity}  {getUnit(product.unit).name}</label>
                        }   
                    </td>
                    <td><Button onClick={() =>{props.openActionMaodal(props.record,'view')}}>Disburse Inventory</Button></td>
                </tr>
            )
        }    
        const TransactionView = (props)=>{
            return (
            <>
                <Row>
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h3>Transaction Requests by other Branches</h3>
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
                            <br />
                            {/* <h3>Transaction Request raised by You</h3>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Branch</th>
                                        <th>requested Inventory</th>
                                        <th>note</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((request,idx)=>(
                                        <tr key={idx}>
                                            <td>{request.branch}</td>
                                            <td>{request.requestedInventory}</td>
                                            <td>{request.note}</td>
                                            <td><Row><Col><Button>Cancel Request</Button></Col></Row></td>
                                        </tr>)
                                    )}
                                </tbody>
                            </Table> */}
                        </div>
                    </div>
                </div>
                </Row>
            </>
            )
        }
        return (
            <div>
                <InventorySkeleton key="Inventory" content={{pageTitle:'Inventory'}} 
                    OptionalTabel = {TransactionView}
                    AddModal={AddInventory}
                    EditModal={()=><></>}
                    ViewModal={ViewInventory}
                    DeleteModal={()=><></>}
                    tableRowRenderFunc ={RowRender}
                    headerArr = {headerArr}
                    getTitle={getTitle}
                    {...this.props}
              >
                  <TransactionView /> 
              </InventorySkeleton>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapActionToProps)(Inventory)