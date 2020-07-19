import React from 'react';
import {Button} from 'react-bootstrap';
import {getBranch, getRole} from '../../utils/dataUtils';
import {MODULE_USER} from "../../utils/accessControl";
import isAllowed, {ACTION_VIEW, ACTION_MANAGE, ACTION_DELETE} from "../../utils/accessControl";

const UserListItem = props => {
    let {record} = props;
    return (
        <tr>
            <td>{`${record.firstName} ${record.lastName}`}</td>
            <td className="d-none d-sm-table-cell">{record.email}</td>
            <td>{getRole(record.role).name}</td>
            <td>{getBranch(record.branch).name}</td>
            <td>{record.contact}</td>
            <td>
                {record.isActive
                ? <label className="badge badge-success">Active</label>
                : <label className="badge badge-warning">In Active</label>
                }
            </td>

            <td>
                <nav>
                    {isAllowed(ACTION_VIEW, MODULE_USER) &&
                        <Button className="btn btn-primary" onClick={() => props.openActionMaodal(record, "view")}>
                            View
                        </Button>
                    }
                    {isAllowed(ACTION_MANAGE, MODULE_USER) &&
                        <Button onClick={() => props.openActionMaodal(record, "edit")} className="btn btn-primary ml-2">
                            Edit
                        </Button>
                    }
                    {isAllowed(ACTION_MANAGE, ACTION_DELETE) &&
                        <Button onClick={() => props.openActionMaodal(record, "del")} className="btn btn-danger ml-2">
                            Delete
                        </Button>
                    }
                </nav>
            </td>
        </tr>
    );
};

export default UserListItem;