import React from 'react';
import {Button} from 'react-bootstrap';
import {connect } from 'react-redux';
import {getBranch, getRole} from '../../utils/dataUtils';
import userActions from '../../actions/userActions'
import {MODULE_USER} from "../../utils/accessControl";
import isAllowed, {ACTION_VIEW, ACTION_MANAGE} from "../../utils/accessControl";

class UserListItem extends React.PureComponent {

    enableRecord = () => {
        let {record} = this.props;
        this.props.updateData({...record, isActive:true});
    }

    render() {
        let {record} = this.props;
        return (
            <tr>
                <td>{`${record.firstName} ${record.lastName}`}</td>
                <td className="d-none d-sm-table-cell">{record.email}</td>
                <td>{getRole(record.role).name}</td>
                <td>{getBranch(record.branch).name}</td>
                <td>{record.contact}</td>
                <td>{record.isActive ? "Active" : "InActive"}</td>
                <td>
                    <nav>
                        {isAllowed(ACTION_VIEW, MODULE_USER) &&
                            <Button className="btn btn-primary" onClick={() => this.props.openActionMaodal(record, "view")}>
                                View
                            </Button>
                        }
                        {isAllowed(ACTION_MANAGE, MODULE_USER) &&
                            <Button disabled={!record.isActive} onClick={record.isActive ? () => this.props.openActionMaodal(record, "edit") : undefined} className="btn btn-primary ml-2">
                                Edit
                            </Button>
                        }
                        {record.isActive && isAllowed(ACTION_MANAGE, MODULE_USER) &&
                            <Button onClick={() => this.props.openActionMaodal(record, "del")} className="btn btn-danger ml-2">
                                Disable
                            </Button>
                        }
                        {!record.isActive && isAllowed(ACTION_MANAGE, MODULE_USER) &&
                            <Button onClick={this.enableRecord} className="btn btn-primary ml-2">
                                Enable
                            </Button>
                        }
                    </nav>
                </td>
            </tr>
        );
    }
};

const mapActionToProps = {
    updateData : userActions.updateData
};

export default connect(null, mapActionToProps)(UserListItem);