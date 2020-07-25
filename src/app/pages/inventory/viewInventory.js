import React from "react"
import {Form, Row,Col} from 'react-bootstrap'
import {addNotification} from '../../actions/notification'
import Modal from '../../shared/Modal'
import {parseInteger} from '../../utils/commonUtil'
import {getBranchInfo,getProduct} from '../../utils/dataUtils'


class ApproveOrRejectView extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            quantityMap : {}
        }
    }
    getCurrentValForBranch = (branchId) => {
        return this.props.inventory.summaryCache[this.props.record.product][branchId].availableQuantity
    }
    componentDidMount(){
        this.setState({
            ...this.props.record,
            quantityMap : {

            }
         })
    }

    validateParams = () => {
        let valid = true
        Object.keys(this.state.quantityMap).forEach(key=>{
            const operationalQuantity = parseInteger(this.state.quantityMap[key])
            if(operationalQuantity > this.getCurrentValForBranch(key)){
                valid = false
                addNotification({
                    title : "Please Check Quantity Parameter",
                    message: `Quantity can't be greater than available Quantity for ${getBranchInfo(key).name} branch`,
                    type : "warning"
                })
            }if(operationalQuantity < 0) {
                valid = false
                addNotification({
                    title : "Please Check Quantity Parameter",
                    message: "Quantity can't be negative",
                    type : "warning"
                })
            }
        })
        return valid;
    }

    transformParamas = () => {
        let map = {}
        Object.keys(this.state.quantityMap).forEach(key=>{
            const operationalQuantity = parseInteger(this.state.quantityMap[key])
            if(operationalQuantity > 0) {
                map[key] = operationalQuantity
            }
        })
        return {
            ...this.state,
            quantityMap : map
        }
    }

    handleQuantityChange = (branchId,evt) => {
        this.setState({
            ...this.state,
            quantityMap : {
                ...this.state.quantityMap,
                [branchId]:evt.target.value
            }
        })
    }
    
    onSubmit = event => {
        if (!this.validateParams()) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            this.props.acceptOrRejectTransaction(this.transformParamas());
            this.props.closeModal();
        }
    }
    render(){

        const product = getProduct(this.props.record.product);
        const keys = Object.keys(this.props.inventory.summaryCache[product.id])
        let sum = 0
        if(this.state.quantityMap){
            Object.keys(this.state.quantityMap).forEach(entry => {
                sum += parseInteger(this.state.quantityMap[entry])
            })
        }
    return (
        <Modal
        dialogClassName = "AcceptClass"
        size ="lg"
         show={true} title="Accept" closeModal={this.props.closeModal}>
        <form className="forms-sample" onSubmit={this.onSubmit} >
           <div className="pl-3 pr-3">
               <div className="formData">
               <Row>
                   <Col>
                        <h6>
                            Product : {product.name}
                        </h6>
                   </Col>
                   <Col>
                        <h6>
                            Branch : {this.props.toBranchName}
                        </h6>
                   </Col>
               </Row>
               <Row>
                   <Col>
                        <h6>
                            Requested Amount : {this.props.record.operationalQuantity}
                        </h6>
                   </Col>
                   <Col>
                        <h6>
                            Selected Quantity : {sum}
                        </h6>
                   </Col>
               </Row>
               </div>
                { keys.map((key,idx)=>{
                    const val = this.props.inventory.summaryCache[product.id][key]
                    console.log(key,val)
                    if(this.state.toBranch === key) return <></>
                    return (
                        <>
                        <Row key={idx}>
                            <Col>
                                <h6>{getBranchInfo(key).name}</h6> 
                                <h6>Available Quantity : {val.availableQuantity}</h6>
                                <h6>threshold : {val.threshold}</h6>
                                
                            </Col>
                            <Col>
                                <Form.Control type="number" id={"Branch"+idx} className="form-control" 
                                    name="note" placeholder="Select Quantity" value={this.state.quantityMap[key]}
                                onChange={e=>this.handleQuantityChange(key,e)} />
                            </Col>
                        </Row>
                        <hr />
                        </>
                    )

                })}
               <Row>
                    <Col>

                    </Col>
               </Row>
               <Row>
                <Col>
                </Col>
               </Row>
               <hr className="modal-footer-ruler" />
               <div className="text-right">
                   <button type="button" className="btn btn-light mr-2" onClick={this.props.closeModal}>Cancel</button>
                   <button type="submit" className="btn btn-primary">Accept</button>
               </div>
           </div>
       </form>
   </Modal>
    )
}
}


export default ApproveOrRejectView;