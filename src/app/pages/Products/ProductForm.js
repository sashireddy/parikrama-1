import React from "react";
import {Form} from "react-bootstrap";
import Select from 'react-select'
import {getDropdownItem,dropDownResponseFromMap} from '../../utils/dropDownUtils'
import {getCategory,getUnit} from '../../utils/dataUtils'
import isAllowed, { ACTION_MANAGE,MODULE_INVENTORY} from "../../utils/accessControl";
import {connect} from 'react-redux'
import ProductActions from '../../actions/productActions'

const mapStateToProps = state => ({
    stateData :{
        category : state["CATEGORY"],
        unit : state["UNITS"],
        user : state["USER"].loggedInUser,
        branches: state["BRANCHES"]
    }
});

const mapActionToProps = {
    ...ProductActions
};

class ProductForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ...props.record,
            isActive: true
        }
        if(this.state.thresholds){
            Object.keys(this.state.thresholds).forEach(key => this.state.thresholds[key] = parseInt(this.state.thresholds[key]))
        }
    }

    componentDidMount(){

    }

    handleChange = evt => {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
        });
    }
    handleThresholdChange =(evt,branch) => {
        this.setState({
            ...this.state,
            thresholds :{
                ...this.state.thresholds,
                [branch] : parseInt(evt.target.value)
            }
        })
    }
    handleDropDown = (label,evt) => {
        this.setState({
            ...this.state,
            [label]: evt.value
        })
    }

    onSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false && this.state.category && this.state.unit) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            this.props.onSubmit({...this.state});
        }


    }


    render() {
        console.log(this.state)
        console.log(this.props)
        const categorydropDownArr = dropDownResponseFromMap(this.props.stateData.category.allCategories)
        const unitdropDownArr = dropDownResponseFromMap(this.props.stateData.unit.allRecords)
        const defaultCategory = (this.props.record && this.props.record.category)
        const defaultUnit = (this.props.record && this.props.record.unit)
        const defaultUnitName = defaultUnit && getUnit(defaultUnit) && getUnit(defaultUnit).name
        const defaulCategoryName =  defaultCategory && getCategory(defaultCategory) && getCategory(defaultCategory).name
        const branchesMap = this.props.stateData.branches.allRecords
        const branchesArr = Object.keys(branchesMap)
        const thresoldValue = this.state.thresholds && this.state.thresholds[this.props.stateData.user.branch]
        return(
            <form className="forms-sample" onSubmit={this.onSubmit} >
                <div className="pl-3 pr-3">
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Product Name</label>
                        <Form.Control required type="text" className="form-control" id="productName" name="name" placeholder="Product Name" value={this.state.name} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please provide a Product name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Category</label>
                        <Select className="basic-single" classNamePrefix="select" defaultValue={getDropdownItem(defaulCategoryName,defaultCategory)}
                            isClearable={true} isSearchable={true}  options={categorydropDownArr} onChange={(e)=>{this.handleDropDown('category',e)}}/>
                        <Form.Control.Feedback type="invalid">Please provide the category name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Unit</label>
                        <Select className="basic-single" classNamePrefix="select" defaultValue={getDropdownItem(defaultUnitName,defaultUnit)}
                            isClearable={true} isSearchable={true}  options={unitdropDownArr} onChange={(e)=>{this.handleDropDown('unit',e)}}/>
                        <Form.Control.Feedback type="invalid">Please provide the unit name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Product Threshold at your branch</label>
                        <Form.Control type="number" className="form-control" id="productName" name="name" placeholder="Product Name" value={thresoldValue} onChange={e=>this.handleThresholdChange(e,this.props.stateData.user.branch)} />
                        <Form.Control.Feedback type="invalid">Please provide Product Threshold</Form.Control.Feedback>
                    </Form.Group>
                    {isAllowed(ACTION_MANAGE, MODULE_INVENTORY)  && (
                        <>
                            {branchesArr.map(branchId=> {
                                if(branchId !== this.props.stateData.user.branch){
                                    const threshold = (this.state.thresholds && this.state.thresholds[branchId])
                                 return (<Form.Group>
                                    <label htmlFor="exampleInputEmail1">Product Threshold at {branchesMap[branchId].name} branch</label>
                                    <Form.Control type="number" className="form-control" id="productName" name="name" placeholder="Threshold" value={threshold} onChange={e=>this.handleThresholdChange(e,branchId)} />
                                    <Form.Control.Feedback type="invalid">Please provide Product Threshold</Form.Control.Feedback>
                                </Form.Group>)
                                }
                                return <></>
                            })}
                        </>
                    )}
                </div>
                <hr className="modal-footer-ruler" />
                <div className="text-right">
                    <button type="button" className="btn btn-light mr-2" onClick={this.props.closeModal}>Cancel</button>
                    <button type="submit" className="btn btn-primary">{this.props.label}</button>
                </div>
            </form>
        );
    }
}

export default connect(mapStateToProps, mapActionToProps)(ProductForm);