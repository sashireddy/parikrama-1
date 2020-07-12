import React from 'react'
import Skeleton from '../CrudSkeleton/index'
import unitActions from "../../actions/units";
import Add from "./add";
import {connect} from "react-redux";
import {Button} from "react-bootstrap"

const mapStateToProps = state => ({
    ...state["UNITS"]
});

const mapActionToProps = {
    ...unitActions
};
const RoleSkeleton = connect(mapStateToProps, mapActionToProps)(Skeleton)

class Unit extends React.Component {
    render(){
        const getTitle = (actionType) => {
            switch (actionType) {
                case "add":
                    return "Add Unit";
                case "delete":
                    return "Delete Unit";
                default:
                    return "Manage Unit";
            }
        }
        const headerArr = [
                {
                    value : 'Name',
                    key : 'name',
                    sortable : true,
                    searchable: true
                },{
                    value : 'Description',
                    key : 'description'
                }
            ]

        return (
            <RoleSkeleton key="Unit" content={{pageTitle:'Unit'}} AddModal={Add}
             EditModal={()=><></>} ViewModal={()=><></>} DeleteModal={()=><></>}
             tableRowRenderFunc ={(props)=>{
                 
                 return <tr>
                            <td>{props.record.name}</td>
                            <td>{props.record.description}</td>
                        </tr>
             }} pk="id"
             headerArr = {headerArr} getTitle={getTitle}/>
        )
    }
}

export default Unit;