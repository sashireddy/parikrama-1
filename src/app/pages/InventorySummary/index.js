import React from 'react'
import Skeleton from '../CrudSkeleton/index'
import { connect } from 'react-redux'
import {Form} from 'react-bootstrap'
import DatePicker from "react-datepicker"
import Select from 'react-select';
import { Card } from 'react-bootstrap'
import {getSelectedItem, dropDownResponseFromMap} from '../../utils/dropDownUtils';
import InventorySummaryAction from '../../actions/InventoryView'
import {getUnit,getCategory,getProduct,getLoggedInUserInfo} from '../../utils/dataUtils'
import dateFormat from "dateformat";

const customStyles = {
    control: base => ({
      ...base,
      height: 45
    })
};

class InventorySummary extends React.Component {

    constructor(props){
        super()
        const endDate = new Date()
        const startDate = new Date().setMonth(endDate.getMonth()-1)
        this.state = {
            branch: getLoggedInUserInfo().branch,
            startDate,
            endDate,
            // startDate: dateFormat(startDate, "yyyy-MM-dd"),
            // endDate: dateFormat(endDate, "yyyy-MM-dd"),
            error: false
        }
    }
    getData = (crudParams) => {
        console.log(crudParams)
        this.props.loadData({
            ...crudParams,
            startDate: dateFormat(this.state.startDate, "yyyy-mm-dd"),
            endDate: dateFormat(this.state.endDate, "yyyy-mm-dd"),
            branch : this.state.branch
            })
    }

    setDate = (field, date) => {
        this.setState({
            [field]: date
        });
    }


    onSubmit = evt => {
        evt.preventDefault();
        const {startDate, endDate} = this.state;
        // Both are present or both are empty then only search
        if((startDate && endDate) || (!startDate && !endDate)){
            this.setState({error: false});
            this.loadData({
                currentPage : this.props.stateData.currentPage,
                pageLimit : this.props.stateData.pageLimit,
                search : this.props.stateData.search,
                sort : this.props.stateData.sort,
            });
        } else {
            this.setState({error: true});
        }
    }

    render(){
        const getTitle = (actionType) => {
            switch (actionType) {
                default:
                    return "Inventory";
            }
        }
        const headerArr = [
                {
                    value : 'Product',
                    key : 'product',
                    sortable : true,
                    searchable: true
                },{
                    value : 'Category',
                    key : 'category'
                },{
                    value : 'Threshold',
                    key : 'threshold'
                },{
                    value : 'Initial Quantity',
                    key : 'Initial Quantity'
                },{
                    value : 'Consumed Quantity',
                    key : 'Consumed Quantity'
                },{
                    value : 'Transfered Quantity',
                    key : 'Transfered Quantity'
                },{
                    value : 'Added Quantity',
                    key : 'Added Quantity'
                },{
                    value : 'Closing Quantity',
                    key : 'Closing Quantity'
                }
            ]
        
        const getQuantityWithUnit = (quantity, product) => {
            return quantity+" "+getUnit(product.unit).name
        }
        const getQuantityLabel = (quantity,threshold,product) =>  quantity > threshold ? 
            <label className="badge badge-success">{getQuantityWithUnit(quantity,product)}</label> :
            <label className="badge badge-warning">{getQuantityWithUnit(quantity,product)}</label>
        const tableRowRenderFunc = (props)=> {
            const product = getProduct(props.record.product)
            return (
                <tr>
                    <td>{product.name}</td>
                    <td>{getCategory(product.category).name}</td>
                    <td>{props.record.threshold}</td>
                    <td>{getQuantityLabel(props.record.initialQuantity,props.record.threshold,product)}</td>
                    <td>{getQuantityWithUnit(props.record.consumedQuantity,product)}</td>
                    <td>{getQuantityWithUnit(props.record.transferredQuantity,product)}</td>
                    <td>{getQuantityWithUnit(props.record.addedQuantity,product)}</td>
                    <td>{getQuantityLabel(props.record.closingQuantity,props.record.threshold,product)}</td>  
                </tr>
            )
        }
        return(
            <Skeleton 
             content={{pageTitle:'Inventory Summary'}}
             tableRowRenderFunc ={tableRowRenderFunc}
             headerArr = {headerArr} getTitle={getTitle}
             getData = {this.getData} {...this.props.stateData}
             DontShowButon 
            >
                <Card>
                    <Card.Body>
                    <Form className="custom-page-filter" onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <DatePicker
                            dateFormat="yyyy-MM-dd"
                            selected={this.state.startDate}
                            onChange={date => this.setDate('startDate', date)}
                            selectsStart
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            maxDate={this.state.endDate}
                            className="form-control"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>End Date</Form.Label>
                        <DatePicker
                            dateFormat="yyyy-MM-dd"
                            selected={this.state.endDate}
                            onChange={date => this.setDate('endDate', date)}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            minDate={this.state.startDate}
                            className="form-control"
                        />
                        </Form.Group>
                        <Form.Group className="select-box-fix">
                        <Form.Label>Branch</Form.Label>
                        <Select className="basic-single" classNamePrefix="select" value={getSelectedItem(this.props.branchDropDownArr, this.state.branch)}
                        options={this.props.branchDropDownArr} onChange={(e)=>{this.handleDropDown('branch', e)}}
                        isSearchable placeholder="Select Branch" styles={customStyles}/>
                    </Form.Group>
                    <Form.Group>
                        <input type="submit" value="Search" className="btn btn-primary"/>
                    </Form.Group>
                </Form>
                {this.state.error ? <p className="text-warning">Please select both start and end date</p> : null}
                                        
                </Card.Body>
            </Card>
            </Skeleton>
        )
    }
}
const mapStateToProps = (state) => ({
    branchDropDownArr : dropDownResponseFromMap(state.BRANCHES.allRecords),
    stateData : state['INVENTORYSUMMARY']
})
const actionsToProps = {
    loadData : InventorySummaryAction.getInventory
}
export default connect(mapStateToProps,actionsToProps)(InventorySummary)
