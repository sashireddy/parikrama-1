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
            },{
                value : 'Units',
                key : 'Units'
            },{
                value:'Actions',
                key:'actions'
            }
            ]
        const issueParams = (records) => {
            return {
                ...records,
                fromBranch : this.state.branch,
                fromBranchName : this.state.branchName,
            }
        }
        const QuantityTag =  (availableQuantity,threshold) =>{
            return availableQuantity > threshold ?
                <label className="badge badge-success QuantityBadge">{availableQuantity}  </label> :
                <label className="badge badge-warning QuantityBadge">{availableQuantity}  </label>
        }
        const RowRender = (props) => {
            return (
                <tr>
                    <td>{props.record.productName}</td>
                    <td>{props.record.categoryName}</td>
                    {this.state.branch !== "ALL_BRANCHES" && (
                        <>
                        <td>{this.state.branchName}</td>
                        <td>{props.record.threshold}</td>
                        <td>{QuantityTag(props.record.availableQuantity,props.record.threshold)}</td>
                        </>
                    )}
                    {this.state.branch === "ALL_BRANCHES" &&
                        (
                            <>
                                <td>{props.record.quantityBranch &&
                                    props.record.quantityBranch.map((entry,idx) => {
                                    return <div key={idx} className="tableRow">{entry.name}</div>})}
                                </td>
                                <td>
                                    {props.record.quantityBranch &&
                                    props.record.quantityBranch.map((entry,idx) => {
                                        return <div key={idx} className="tableRow">{entry.quantity.threshold}</div>
                                    })}
                                </td>
                                <td>
                                    {props.record.quantityBranch &&
                                    props.record.quantityBranch.map((entry,idx) => {
                                        return <div key={idx} className="tableRow">{QuantityTag(entry.quantity.availableQuantity,entry.quantity.threshold)}</div>
                                    })}
                                </td>
                            </>
                    )}
                    <td>{props.record.unitName}</td>
                    <td>{ (this.state.branch === getLoggedInUserInfo().branch||isAdmin)&& this.state.branch !== "ALL_BRANCHES" && <Button onClick={() =>{props.openActionMaodal(issueParams(props.record),'view')}}>Disburse</Button>}</td>
                </tr>
            )
        }
        const branchOptions = dropDownResponseFromMap(this.props.stateData.state.BRANCHES.allRecords)
        branchOptions.push(getDropdownItem("All Branches","ALL_BRANCHES"))
        return (
            <div className="inventory_page">
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
                    pk="id"
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