import React from 'react'
import Skeleton from '../CrudSkeleton/index'
import { connect } from 'react-redux'
import {Form} from 'react-bootstrap'
import DatePicker from "react-datepicker"
import Select from 'react-select';
import { Card } from 'react-bootstrap'
import dateFormat from "dateformat";
import {getSelectedItem, dropDownResponseFromMap} from '../../utils/dropDownUtils';
import InventorySummaryAction from '../../actions/InventoryView'


const customStyles = {
    control: base => ({
      ...base,
      height: 45
    })
};

class InventorySummary extends React.Component {

    constructor(props){
        super()
        this.state = {
            branch: "MxoS2K8t8jT7MATniD4x",
            startDate: "",
            endDate: "",
            email: "",
            error: false
        }
    }
    getData = (crudParams) => {
        console.log(crudParams)
        this.props.loadData(crudParams)
    }

    onSubmit = evt => {
        evt.preventDefault();
        const {startDate, endDate} = this.state;
        // Both are present or both are empty then only search
        if((startDate && endDate) || (!startDate && !endDate)){
            this.setState({error: false});
            this.loadData();
        } else {
            this.setState({error: true});
        }
    }

    render(){
        const getTitle = (actionType) => {
            switch (actionType) {
                case "add":
                    return "Add Branch";
                case "view":
                    return "View Branch";
                case "edit":
                    return "Edit Branch";
                case "del":
                    return "Delete Branch";
                default:
                    return "Manage Branch";
            }
        }
        const headerArr = [
                {
                    value : 'Name',
                    key : 'name',
                    sortable : true,
                    searchable: true
                },{
                    value : 'Category',
                    key : 'category'
                },{
                    value : 'Threshold',
                    key : 'threshold'
                },{
                    value : 'units',
                    key : 'units'
                },{
                    value : 'Actions',
                    key : 'actions'
                }
            ]
        const EmptyRender = () => <></>
        const tableRowRenderFunc = (props)=> {
            return(
            <tr>
                <td>{props.record.name}</td>
                <td>{props.record.category}</td>
                <td>{props.record.product}</td>
                <td>{props.record.addedQuantity}</td>
            </tr>
            )
        }
        console.log(this.props.stateData)
        return(
            <Skeleton 
             content={{pageTitle:'Inventory Summary'}} AddModal={EmptyRender}
             EditModal={EmptyRender} ViewModal={EmptyRender} DeleteModal={EmptyRender}
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
                            // selectsStart
                            startDate={this.state.startDate}
                            // endDate={this.state.endDate}
                            // maxDate={this.state.endDate}
                            className="form-control"
                        />
                    </Form.Group>
                                        {/* <Form.Group>
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
                                        </Form.Group> */}
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
