import React from 'react'
import CrudSkeleton from '../CrudSkeleton/index'
import inventoryActions from '../../actions/inventoryActions'
import AddInventory from './AddInventory'
import ViewInventory from './viewInventory'
import {Table,Button} from 'react-bootstrap'
import {
    connect,
    // dispatch
} from "react-redux";


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


const mapActionToProps = {
    ...inventoryActions
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
                    return "Move Inventory";
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
                value : 'id',
                key : '_id',
            },{
                value: 'category',
                key: 'category',
            },{
                value: 'product',
                key: 'product',
            },{
                value: 'balance',
                key: 'balance',
            },{
                value:'actions',
                key:'actions'
            }
            ]
        const RowRender = (props) => {
            return (
                <tr>
                    <td>{props.data._id}</td>
                    <td>{props.data.category}</td>
                    <td>{props.data.product}</td>
                    <td>{props.data.balance}</td>
                    <td><Button onClick={() =>{props.openActionMaodal(props.data,'view')}}>Disburse Inventory</Button></td>
                </tr>
            )
        }    
        const TransactionView = (props)=>{
            return (
                <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h3>Transaction Requests</h3>
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
                                            <td><Button>Approve Request</Button><Button>Reject Request</Button></td>
                                        </tr>)
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                </div>
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