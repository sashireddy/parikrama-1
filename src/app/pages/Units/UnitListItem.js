import React from 'react';
import {Button} from 'react-bootstrap';
import {MODULE_INVENTORY} from "../../utils/accessControl";
import isAllowed, {ACTION_VIEW, ACTION_MANAGE} from "../../utils/accessControl";

class UnitListItem extends React.PureComponent {

    enableRecord = () => {
        let {record} = this.props;
        this.props.updateData({...record, isActive:true});
    }

    render() {
        let {record} = this.props;
        return (
            <tr>
                <td>{record.name}</td>
                <td>{record.description}</td>
                <td>{record.isActive ? "Active" : "Inactive"}</td>
                <td>
                    <nav>
                        {isAllowed(ACTION_VIEW, MODULE_INVENTORY) &&
                            <Button className="btn btn-primary" onClick={() => this.props.openActionMaodal(record, "view")}>
                                View
                            </Button>
                        }
                        {isAllowed(ACTION_MANAGE, MODULE_INVENTORY) &&
                            <Button disabled={!record.isActive} onClick={record.isActive ? () => this.props.openActionMaodal(record, "edit") : undefined} className="btn btn-primary ml-2">
                                Edit
                            </Button>
                        }
                        {record.isActive && isAllowed(ACTION_MANAGE, MODULE_INVENTORY) &&
                            <Button onClick={() => this.props.openActionMaodal(record, "del")} className="btn btn-primary ml-2">
                                Disable
                            </Button>
                        }
                        {!record.isActive && isAllowed(ACTION_MANAGE, MODULE_INVENTORY) &&
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

export default UnitListItem;