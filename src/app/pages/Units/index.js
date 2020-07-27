import React from 'react'
import Skeleton from '../CrudSkeleton/index'
import unitActions from "../../actions/unitActions";
import AddUnit from "./AddUnit";
import {connect} from "react-redux";
import EditUnit from './EditUnit'
import DeleteUnit from './DeleteUnit'
import ViewUnit from './ViewUnit'
import UnitListItem from "./UnitListItem";
import {MODULE_INVENTORY} from "../../utils/accessControl";

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
                    return "Create Unit";
                case "edit":
                    return "Update Unit";
                case "view":
                    return "View Unit";
                case "del":
                    return "Disable Unit";
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
            <RoleSkeleton key="Unit"
                content={{pageTitle:'Unit of Measure', addButton: 'New Unit'}}
                AddModal={AddUnit}
                EditModal={EditUnit}
                ViewModal={ViewUnit}
                DeleteModal={DeleteUnit}
                tableRowRenderFunc={UnitListItem}
                pk="id"
                headerArr={headerArr} getTitle={getTitle} moduleName={MODULE_INVENTORY}
            />
        )
    }
}

export default Unit;