import React from "react"
import {Form,Button} from 'react-bootstrap'
import Select from 'react-select'
import {connect} from 'react-redux'
import {dropDownResponseFromMap,getHeadOfficeDropDown} from '../../utils/dropDownUtils'
import {getLoggedInUserInfo,getBranchInfo} from '../../utils/dataUtils'
import InventoryActions from '../../actions/inventoryActions'
import {parseInteger} from '../../utils/commonUtil'
import {addNotification} from '../../actions/notification'
const mapStateToProps = state => ({
    products: state['PRODUCTS'],
    branches : state['BRANCHES'],
})

const LocalRequest = "ADD_PRODUCT"
const TransferRequest = "RAISE_REQUEST"
const Adjustment = "ADJUSTMENT"

// const 
class AddCategory extends React.Component {

    constructor(){
        super();
        const userInfo = getLoggedInUserInfo();
        const branchInfo = getBranchInfo(userInfo.branch)
        this.state = {
            fromBranch: userInfo.branch,
            fromBranchName: branchInfo.name,
            type:"ADD_PRODUCT",
            rowsArr :[{
                operationalQuantity :0,
            }]
        }
    }

    componentDidMount(){
        this.setState({...this.props.category});
    }

    handleChange =(evt,idx) => {
        const newState = Object.assign({},this.state)
        newState.rowsArr[idx] = {
            ...this.state.rowsArr[idx],
            operationalQuantity : evt.target.value
        }
        this.setState(newState)

    }
    handleNote = evt => {
        this.setState({
            ...this.state,
            note: evt.target.value
        })
    }

    handleProductDropDown = (evt,idx) => {
        const newState = Object.assign({},this.state)
        newState.rowsArr[idx] = {
            ...this.state.rowsArr[idx],
            product: evt && evt.value,
            productName: evt && evt.label
        }
        this.setState(newState)
        // this.setState({
        //     ...this.state,
        //     product: evt && evt.value,
        //     productName: evt && evt.label
        // })
}

    handleBranchDropDown =evt => {
        this.setState({
        ...this.state,
        toBranch: evt && evt.value,
        toBranchName: evt && evt.label
        })
    }
    validateParamsRow = (row,type,idx) => {
        const operationalQuantity = parseInteger(row.operationalQuantity)
        if(!row.product){
            addNotification({
                title : "Please Select Product Field",
                message : "Prooduct field can't be empty in row"+idx,
                type : "warning"
            })
            return false
        }
        if( (type === Adjustment && operationalQuantity >= 0 )||
            (type !== Adjustment && operationalQuantity > 0)){
            return true
        }else if(operationalQuantity === 0 && type !== Adjustment){
            addNotification({
                title : "Please Check Quantity Parameter",
                message: "Quantity can't be 0 in row"+idx,
                type : "warning"

            })
        }if(type !== Adjustment && operationalQuantity < 0){
            addNotification({
                title : "Please Check Quantity Parameter",
                message: "Quantity can't be negative in row"+idx,
                type : "warning"

            })
        }
        return false
    }
    validateParams = () => {
       let resp = true
       this.state.rowsArr.forEach((row,idx)=>{
           resp = resp && this.validateParamsRow(row,this.state.type,idx)
       })
    }
    transformParams = () => {
        const newArr = [...this.state.rowsArr]
        newArr.map(row => ({
            ...row,
            operationalQuantity : parseInteger(row.operationalQuantity)
        }))
        return {
            ...this.state,
            rowsArr : newArr
        }
    }

    onSubmit = event => {
        const validParamsflag = this.validateParams()
        if (!validParamsflag) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            this.props.createTransaction(this.transformParams());
            this.props.closeModal();
        }

    }
    removeRow =  idx => {
        const newArr = [...this.state.rowsArr]
        newArr.pop()
        // const arr = this.state.rowsArr.splice(idx,1)
        this.setState({
            ...this.state,
            rowsArr : newArr
        })
    }
    addRow =  ()=>{
        this.setState({
            ...this.state,
            rowsArr: [...this.state.rowsArr,{
                operationalQuantity : 0
            }]
        })
    }

    onStatusChange = label => {
            this.setState({
                ...this.state,
                type:label,
            })
    }


    render() {
        const productDropdownArr = dropDownResponseFromMap(this.props.products.allRecords);
        const branchDropdownArr = getHeadOfficeDropDown();
        let isNotAdminBranch = !getBranchInfo(getLoggedInUserInfo().branch).isHeadOffice;
        return (
            <form className="forms-sample" onSubmit={this.onSubmit} >
                <div className="pl-3 pr-3">
                    <Form.Group>
                        <label htmlFor="isHeadOffice">Request Type</label>
                        <Form.Check type="radio" id={LocalRequest} name={LocalRequest} value={LocalRequest}
                            label="Add Inventory Locally" checked={this.state.type === LocalRequest}
                            onChange={e=>this.onStatusChange(LocalRequest)} />
                        { isNotAdminBranch &&<Form.Check type="radio" id={TransferRequest} name={TransferRequest} value={TransferRequest}
                            label="Request from Head Office" checked={this.state.type===TransferRequest}
                            onChange={e=>this.onStatusChange(TransferRequest)} />}
                        <Form.Check type="radio" id={Adjustment} name={Adjustment} value={Adjustment}
                            label="Add Adjustment transaction" checked={this.state.type===Adjustment}
                            onChange={e=>this.onStatusChange(Adjustment)} />
                    </Form.Group>
                    {/* <Form.Group>
                        <label htmlFor="exampleInputEmail1">Product</label>
                        <Select className="basic-single" classNamePrefix="select"
                            isClearable={true} isSearchable={true}  options={productDropdownArr} onChange={(e)=>{this.handleProductDropDown(e)}}/>
                    </Form.Group> */}
                    {this.state.type === TransferRequest &&<Form.Group>
                        <label htmlFor="exampleInputEmail1">From Branch(Head Offices)</label>
                        <Select className="basic-single" classNamePrefix="select"
                            isClearable={true} isSearchable={true}  options={branchDropdownArr} onChange={(e)=>{this.handleBranchDropDown(e)}}/>
                    </Form.Group>}
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th className="tableProduct">Product</th>
                            <th className="tableQuantityForm">Quantity</th>
                            {/* <th className="tableRemoveButton"></th> */}
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.rowsArr.map((row,idx)=>(
                                <tr key={idx}>
                                    <td className="tableProduct">
                                    <Select className="basic-single" classNamePrefix="select"
                                        isClearable={true} isSearchable={true}  options={productDropdownArr} onChange={(e)=>{this.handleProductDropDown(e,idx)}}/>
                                    </td>
                                    <td className="tableQuantityForm">
                                        <Form.Group className="tableQuantity">
                                            <Form.Control required type="number" className="form-control" id="operationalQuantity" name="operationalQuantity" 
                                                placeholder="" value={row.operationalQuantity} onChange={e=>this.handleChange(e,idx)} />
                                            <Form.Control.Feedback type="invalid">Please enter a valid quantity</Form.Control.Feedback>
                                        </Form.Group>
                                    </td>
                                    {/* <td className="tableRemoveButton">
                                        {this.state.rowsArr.length >1 &&<Button onClick={()=>this.removeRow(idx)}>-</Button>}
                                    </td> */}
                                </tr>
                            ))}
                        <tr>
                            {/* <td className="tableProduct">
                                <Select className="basic-single" classNamePrefix="select"
                                isClearable={true} isSearchable={true}  options={productDropdownArr} onChange={(e)=>{this.handleProductDropDown(e)}}/>
                            </td>
                            <td className="tableQuantityForm">
                                <Form.Group>
                                    <Form.Control required type="number" className="form-control" id="operationalQuantity" name="operationalQuantity" placeholder="" value={this.state.operationalQuantity} onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid">Please enter a valid quantity</Form.Control.Feedback>
                                </Form.Group>
                            </td>
                            <td className="tableRemoveButton"><Button>-</Button></td> */}
                        </tr>
                        </tbody>
                    </table>
                    <div className="addRemove">
                        <Button className="addButton" onClick={this.addRow}>Add</Button>
                        <Button className="removeButton" onClick={this.removeRow}>Remove</Button>
                    </div>
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
        );
    }
}

export default connect(mapStateToProps,{createTransaction :InventoryActions.createInventoryTransaction})(AddCategory);