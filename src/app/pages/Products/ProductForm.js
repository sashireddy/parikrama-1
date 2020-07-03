import React from "react";
import {Form} from "react-bootstrap";
import Select from 'react-select'
import {ValToDropDownEntry,arrToDropDownArr} from '../../utils/dropDownUtils'
import {connect} from 'react-redux'
import ProductActions from '../../actions/productActions'

const mapStateToProps = state => ({
    stateData :{
        category : state["CATEGORY"],
        unit : state["UNITS"],
        user : state["USER"].loggedInUser,
    } 
});

const mapActionToProps = {
    ...ProductActions
};

class ProductForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ...props.record
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
                [branch] : evt.target.value
            }
        })
    }
    handleDropDown = (label,evt) => {
        this.setState({
            ...this.state,
            [label]: evt.label
        })
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

        
    }


    render() {
        console.log(this.state)
        console.log(this.props)
        const categorydropDownArr = arrToDropDownArr(this.props.stateData.category.allCategories.categories.map(category => category.name))
        const unitdropDownArr = arrToDropDownArr(this.props.stateData.unit.data)
        const defaultCategory = (this.props.record && this.props.record.category)||''
        const defaultUnit = (this.props.record && this.props.record.unit)||''
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
                        <Select className="basic-single" classNamePrefix="select" defaultValue={ValToDropDownEntry(defaultCategory)} 
                            isClearable={true} isSearchable={true}  options={categorydropDownArr} onChange={(e)=>{this.handleDropDown('category',e)}}/>
                        <Form.Control.Feedback type="invalid">Please provide the category name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Unit</label>
                        <Select className="basic-single" classNamePrefix="select" defaultValue={ValToDropDownEntry(defaultUnit)} 
                            isClearable={true} isSearchable={true}  options={unitdropDownArr} onChange={(e)=>{this.handleDropDown('unit',e)}}/>
                        <Form.Control.Feedback type="invalid">Please provide the unit name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Threshold</label>
                        <Form.Control type="number" className="form-control" id="productName" name="name" placeholder="Product Name" value={thresoldValue} onChange={e=>this.handleThresholdChange(e,this.props.stateData.user.branch)} />
                        <Form.Control.Feedback type="invalid">Please provide a Product name</Form.Control.Feedback>
                    </Form.Group>
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