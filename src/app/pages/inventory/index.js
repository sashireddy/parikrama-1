import React from 'react'
import CrudSkeleton from '../CrudSkeleton/index'
import InventoryActions from '../../actions/inventoryActions'
import AddInventory from './AddInventory'
import ViewInventory from './IssueRecord'
import {Button, Col,Row, Card, Form} from 'react-bootstrap'
import PendingTransactions from './PendingInventory'
import {connect,} from "react-redux";
import {getLoggedInUserInfo,getBranchInfo, isAdmin} from '../../utils/dataUtils'
import {getDropdownItem,dropDownResponseFromMap} from '../../utils/dropDownUtils'
import Select from 'react-select'
import isAllowed,{MODULE_INVENTORY,ACTION_MANAGE} from '../../utils/accessControl'

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
            branch : getLoggedInUserInfo().branch,
            branchName : getBranchInfo(getLoggedInUserInfo().branch).name
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
                    return "Add Inventory";
                case "view":
                    return "Disburse";
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
                value: 'Product',
                key: 'productName',
                sortable : true,
                searchable: true
            },{
                value: 'Category',
                key: 'categoryName',
                sortable : true,
                searchable: true
            },{
                value: 'Branch',
                key: 'branch'
            },{
                value: 'Threshold',
                key: 'threshold'

            },{
                value: 'Available Quantity',
                key: 'availableQuantity',
            },
            {
                value:'Actions',
                key:'actions'
            }
            ]
        const RowRender = (props) => {
            return (
                <tr>
                    <td>{props.record.productName}</td>
                    <td>{props.record.categoryName}</td>
                    <td>{this.state.branchName}</td>
                    <td>{props.record.threshold}</td>
                    <td> { props.record.availableQuantity > props.record.threshold ? 
                        <label className="badge badge-success">{props.record.availableQuantity}  {props.record.unitName}</label> :
                        <label className="badge badge-warning">{props.record.availableQuantity}  {props.record.unitName}</label>
                        }   
                    </td>
                    <td>{ (this.state.branch === getLoggedInUserInfo().branch||isAdmin) && <Button onClick={() =>{props.openActionMaodal(props.record,'view')}}>Disburse</Button>}</td>
                </tr>
            )
        }    
        console.log(this.props)
        const branchOptions = dropDownResponseFromMap(this.props.stateData.state.BRANCHES.allRecords)
        return (
            <div>
                <InventorySkeleton key="Inventory" content={{
                    pageTitle:'Inventory',
                    addButton : 'Manage Inventory'
                }} 
                    addOverride = {getLoggedInUserInfo().branch === this.state.branch}
                    AddModal={AddInventory}
                    EditModal={()=><></>}
                    ViewModal={ViewInventory}
                    DeleteModal={()=><></>}
                    tableRowRenderFunc ={RowRender}
                    headerArr = {headerArr}
                    getTitle={getTitle}
                    getData = {this.getData} {...this.props.stateData}
                    addData = {this.props.addData}
                    moduleName = {MODULE_INVENTORY}
              >
                <PendingTransactions />
                <Card className="marginBottom">
                    <Card.Body>
                        <Row>
                            <Col><h3 className="page-title paddedLine">Manage inventory</h3></Col>
                        </Row>
                        <Row>
                            <Col>
                            {isAllowed(ACTION_MANAGE,MODULE_INVENTORY) && (
                                <Form.Group className="select-box-fix">
                                <Form.Label>Branch</Form.Label>
                                <Select className="basic-single" classNamePrefix="select" defaultValue = {getDropdownItem(this.state.branchName,this.state.branch)}
                                    isSearchable={true}  options={branchOptions} onChange={(e)=>{this.handleBranchDropDown(e)}}/>
                                </Form.Group>
                            )}
                            
                            </Col>
                            <Col className="justify-content-end flex">
                                <Button className="buttonNormal" onClick={()=>{this.props.download({...this.state})}}>Download</Button>
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