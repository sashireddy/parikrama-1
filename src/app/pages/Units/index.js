import React from 'react'
import Skeleton from '../CrudSkeleton/index'
import unitActions from "../../actions/units";
import Add from "./add";
import {connect} from "react-redux";
import Edit from './Edit'
import Del from './delete'
import View from './View'
import {Button} from "react-bootstrap"
import {MODULE_INVENTORY} from "../../utils/accessControl";
import {getActivePayload} from '../../utils/dataUtils'
import isAllowed, {ACTION_VIEW,ACTION_MANAGE} from "../../utils/accessControl";
import Store from '../../store'
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
                },{
                    value : 'Status',
                    key : 'isActive'
                },{
                    value : 'Actions',
                    key : 'actions'
                }
            ]

        return (
            <RoleSkeleton key="Unit" content={{pageTitle:'Unit'}} AddModal={Add}

            EditModal={Edit}
            ViewModal={View}
            DeleteModal={Del}
            tableRowRenderFunc ={(props)=>{
                 return <tr>
                            <td>{props.record.name}</td>
                            <td>{props.record.description}</td>
                            <td className="d-none d-sm-table-cell">
                            {props.record.isActive
                                ? <label className="badge badge-success">Active</label>
                                : <label className="badge badge-warning">In Active</label>
                            }
                            </td>
                            <td>
                                <nav>
                                {props.record.isActive && (
                                    <>
                                    {isAllowed(ACTION_VIEW, MODULE_INVENTORY) &&
                                        <Button className="btn btn-primary" onClick={() => props.openActionMaodal(props.record, "view")}>
                                            View
                                        </Button>
                                    }
                                  {isAllowed(ACTION_MANAGE, MODULE_INVENTORY) &&
                                      <Button onClick={() => props.openActionMaodal(props.record, "edit")} className="btn btn-primary ml-2">
                                        Edit
                                      </Button>
                                      }
                                  {isAllowed(ACTION_MANAGE, MODULE_INVENTORY) &&
                                      <Button onClick={() => props.openActionMaodal(props.record, "del")} className="btn btn-primary ml-2">
                                          Disable
                                      </Button>
                                    }
                                    </>)}
                                    {!props.record.isActive && (<Button onClick={()=>Store.dispatch(unitActions.updateData(getActivePayload(props.record)))}>Activate</Button>)}
                                </nav>
                            </td>
                        </tr>
             }} pk="id"
             headerArr = {headerArr} getTitle={getTitle} moduleName={MODULE_INVENTORY}

             />
        )
    }
}

export default Unit;