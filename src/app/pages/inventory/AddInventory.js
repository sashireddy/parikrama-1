import React from "react"
import {Form} from 'react-bootstrap'
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
class AddCategory extends React.Component {
    
    constructor(){
        super();
        const userInfo = getLoggedInUserInfo();
        const branchInfo = getBranchInfo(userInfo.branch)
        this.state = {
            fromBranch: userInfo.branch,
            fromBranchName: branchInfo.name,
           type:"ADD_PRODUCT",
           operationalQuantity : 0,
        }
    }

    componentDidMount(){
        this.setState({...this.props.category});
    }

    handleChange = evt => {
        this.setState({
            ...this.state,
            operationalQuantity : evt.target.value
        })
        
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
            product: evt && evt.value,
            productName: evt && evt.label
        })
}

    handleBranchDropDown =evt => {
        this.setState({
        ...this.state,
        toBranch: evt && evt.value,
        toBranchName: evt && evt.label
        })
    }
    validateParams = () => {
        const operationalQuantity = parseInteger(this.state.operationalQuantity)
        if(!this.state.product){
            addNotification({
                title : "Please Select Product Field",
                message : "Prooduct field can't be empty",
                type : "warning"
            })
            return false
        }
        if( (this.state.type === Adjustment && operationalQuantity >= 0 )||
            (this.state.type !== Adjustment && operationalQuantity > 0)){
            return true
        }else if(operationalQuantity === 0 && this.state.type !== Adjustment){
            addNotification({
                title : "Please Check Quantity Parameter",
                message: "Quantity can't be 0",
                type : "warning"
                
            })
        }if(this.state.type !== Adjustment && operationalQuantity < 0){
            addNotification({
                title : "Please Check Quantity Parameter",
                message: "Quantity can't be negative",
                type : "warning"
                
            })
        }
        return false
    }
    transformParamas = () => {
        return {
            ...this.state,
            operationalQuantity : parseInteger(this.state.operationalQuantity)
        }
    }

    onSubmit = event => {
        const validParamsflag = this.validateParams()
        if (!validParamsflag) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            this.props.createTransaction(this.transformParamas());
            this.props.closeModal();
        }
       
    }

    onStatusChange = label => {
            this.setState({
                ...this.state,
                type:label,
            })
    }


    render() {
        console.log(this.state)
        const productDropdownArr = dropDownResponseFromMap(this.props.products.allRecords)
        const branchDropdownArr = getHeadOfficeDropDown()
        let isNotAdminBranch = !getBranchInfo(getLoggedInUserInfo().branch).isHeadOffice
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
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Product</label>
                        <Select className="basic-single" classNamePrefix="select"
                            isClearable={true} isSearchable={true}  options={productDropdownArr} onChange={(e)=>{this.handleProductDropDown(e)}}/>
                    </Form.Group>
                    {this.state.type === TransferRequest &&<Form.Group>
                        <label htmlFor="exampleInputEmail1">From Branch(Head Offices)</label>
                        <Select className="basic-single" classNamePrefix="select"
                            isClearable={true} isSearchable={true}  options={branchDropdownArr} onChange={(e)=>{this.handleBranchDropDown(e)}}/>
                    </Form.Group>}
                    {   this.state.currentProduct && (<>
                        <dt>Category</dt>
                        <dd>{this.state.currentProduct.category}</dd>
                        </>)
                    }
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