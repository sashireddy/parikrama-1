import React from "react"
import {Form, Row,Col,Alert} from 'react-bootstrap'
import inventoryActions from '../../actions/inventoryActions'
import Modal from '../../shared/Modal'
import {getBranchInfo,getProduct,getCategory} from '../../utils/dataUtils'


class ApproveOrRejectView extends React.Component {
    constructor(props){
        super(props)
        let toBranch;
        Object.keys(props.branches.allRecords).forEach(x => {
            if(props.branches.allRecords[x].name === props.record.toBranchName) {
                toBranch = x
            } 
        })
        this.state = {
            ...props.record,
            toBranch,
            quantityMap : {

            }
         }
    }
    getCurrentValForBranch = (branchId) => {
        return this.props.inventory.summaryCache[this.props.record.product][branchId].availableQuantity
    }

    handleQuantityChange = (branchId,evt) => {
        console.log(evt.target.value)
        const val = parseInt(evt.target.value) || 0
        if(val >=0 && val <= this.getCurrentValForBranch(branchId) ){
        this.setState({
            ...this.state,
            quantityMap : {
                ...this.state.quantityMap,
                [branchId]:val
            }
        })
        }
    }
    
    onSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false && !this.state.currentProduct) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            // console.log(this.state)
            this.props.acceptOrRejectTransaction({...this.state});
            this.props.closeModal();
        }
    }
    render(){
        console.log(this.props)
        console.log(this.state)
        const product = getProduct(this.props.record.product);
        const category = getCategory(product.category)
        const keys = Object.keys(this.props.inventory.summaryCache[product.id])
        let sum = 0
        Object.keys(this.state.quantityMap).forEach(entry => {
            sum += this.state.quantityMap[entry]
        })
    return (
        <Modal
        dialogClassName = "AcceptClass"
        size ="lg"
         show={true} title="Accept Or Reject Request" closeModal={this.props.closeModal}>
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
                            category : {category.name}
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
                        <Row key={idx}>
                            <Col>
                                <h6>{getBranchInfo(key).name}</h6> 
                                <h6>Available Quantity : {val.availableQuantity}</h6>
                                <h6>threshold : {val.threshold}</h6>
                                
                            </Col>
                            <Col>
                                <Form.Control required type="number" id={"Branch"+idx} className="form-control" 
                                    name="note" placeholder="Select Quantity" value={this.state.quantityMap[key]}
                                onChange={e=>this.handleQuantityChange(key,e)} />
                            </Col>
                        </Row>
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
                   <button type="submit" className="btn btn-primary">Add Inventory</button>
               </div>
           </div>
       </form>
   </Modal>
    )
}
}



class ViewCategory extends React.Component {
    
    constructor(){
        super();
        this.state = {
        }
    }

    handleChange = evt => {
            this.setState({
                ...this.state,
                note: evt.target.value
            });
        // }
    }

    onSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            this.props.onSubmit({...this.state});
        }
        this.props.closeModal();
    }

    render() {
        console.log(this.props)
        return (
            <form className="forms-sample" onSubmit={this.onSubmit} >
                <div className="pl-3 pr-3">
                    
                    <Row>
                        <Col>
                            <h6>Current Stock : {this.props.record.balance}</h6> 
                        </Col>                        
                    </Row>
                    <Row>
                        <Alert variant={'danger'}>
                        your stock will fall below threshold after this transaction
                        </Alert>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <label htmlFor="exampleInputEmail1">Quantity</label>
                                <Form.Control required type="number" className="form-control" id="categoryName" name="name" placeholder="" value={this.state.inputQuantity} onChange={this.handleChange} />
                                <Form.Control.Feedback type="invalid">Please enter a valid quantity</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Col>
                    </Col>
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

export default ApproveOrRejectView;