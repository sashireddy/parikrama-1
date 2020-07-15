import React from 'react'
import CrudSkeleton from '../CrudSkeleton/index'
import InventoryActions from '../../actions/inventoryActions'
import AddInventory from './AddInventory'
import ViewInventory from './IssueRecord'
import {Table,Button, Col,Row, Card} from 'react-bootstrap'
import PendingTransactions from './PendingInventory'
import {connect,} from "react-redux";
import {getLoggedInUserInfo,getBranchInfo} from '../../utils/dataUtils'
import {getDropdownItem,dropDownResponseFromMap} from '../../utils/dropDownUtils'
import {getUnit,getCategory,getProduct} from '../../utils/dataUtils'
import Select from 'react-select'


const requests = [{
    id:'requestId-1',
    branch:'Kormangla',
    currentInventory : 300,
    note: 'need this to distribute this month',
    requestedInventory : 30,

}]

const mapStateToProps = state => ({
    stateData: {
        state,
    ...state['INVENTORY']
    }
});

console.log(InventoryActions)

const mapActionToProps = {
    getData : InventoryActions.getData,
    addData : InventoryActions.addData,
    download : InventoryActions.downloadCSV
};
const InventorySkeleton = CrudSkeleton


class Inventory extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            currentCategory: null,
            actionType: null,
            branch : getLoggedInUserInfo().branch
        }
    }

    componentDidMount(){ 
    }

    getData= (crudParams) => {
        this.props.getData({
            branch:this.state.branch,
            ...crudParams
        })
    }

    handleBranchDropDown = (evt) => {
        this.setState({
            ...this.state,
            branch : evt.value,
            branchName : evt.label
        },()=>{
            this.getData({
                ...this.props.stateData
            })
        })
        
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
                    <td>{ this.state.branch === getLoggedInUserInfo().branch && <Button onClick={() =>{props.openActionMaodal(props.record,'view')}}>Disburse Inventory</Button>}</td>
                </tr>
            )
        }    
        console.log(this.props)
        const loggedInUserInfo = getLoggedInUserInfo()
        const branchOptions = dropDownResponseFromMap(this.props.stateData.state.BRANCHES.allRecords)
        branchOptions.push(getDropdownItem("All branches","GET_ALL_BRANCHES"))
        return (
            <div>
                <InventorySkeleton key="Inventory" content={{pageTitle:'Inventory'}} 
                    AddModal={AddInventory}
                    EditModal={()=><></>}
                    ViewModal={ViewInventory}
                    DeleteModal={()=><></>}
                    tableRowRenderFunc ={RowRender}
                    headerArr = {headerArr}
                    getTitle={getTitle}
                    getData = {this.getData} {...this.props.stateData}
                    addData = {this.props.addData}
                    DontShowButon = {getLoggedInUserInfo().branch !== this.state.branch}
              >
                <PendingTransactions />
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                            <Select className="basic-single" classNamePrefix="select" defaultValue = {getDropdownItem(getBranchInfo(loggedInUserInfo.branch).name,loggedInUserInfo.branch)}
                                isSearchable={true}  options={branchOptions} onChange={(e)=>{this.handleBranchDropDown(e)}}/>
                            </Col>
                            <Col>
                                <Button onClick={()=>{this.props.download({...this.state})}}>Download</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
              </InventorySkeleton>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapActionToProps)(Inventory)