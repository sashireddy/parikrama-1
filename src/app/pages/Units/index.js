import React from 'react'
import Skeleton from '../CrudSkeleton/index'
import unitActions from "../../actions/units";
import Add from "./add";
import {connect} from "react-redux";
// import {Button} from "react-bootstrap"
import {MODULE_INVENTORY} from "../../utils/accessControl";
// import isAllowed, {ACTION_MANAGE} from "../../utils/accessControl";

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
<<<<<<< HEAD
                            {/* <td>{isAllowed(ACTION_MANAGE, MODULE_INVENTORY) ? <Button>Delete</Button> : '--'}</td> */}
=======
                            <td>{isAllowed(ACTION_DELETE, MODULE_INVENTORY) ? <Button>Delete</Button> : '--'}</td>
>>>>>>> 5b13984428336de59837457de0a8b8285ef80edf
                        </tr>
             }} pk="id"
             headerArr = {headerArr} getTitle={getTitle} moduleName={MODULE_INVENTORY}/>
        )
    }
}

export default Unit;