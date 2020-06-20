import React from 'react';
import {Button} from 'react-bootstrap';
import {connect} from "react-redux";

class UserListItem extends React.Component {
    getRoleLable = role => {
        let roleObj = this.props.allRoles.find(item => item.id === role);
        return roleObj ? roleObj.label : role;
    }

    render() {
        let {record} = this.props;
        return (
            <tr>
                <td>{`${record.firstName} ${record.lastName}`}</td>
                <td className="d-none d-sm-table-cell">{record.email}</td>
                <td>{this.getRoleLable(record.role)}</td>
                <td>
                    {record.isActive
                    ? <label className="badge badge-success">Active</label>
                    : <label className="badge badge-warning">In Active</label>
                    }
                </td>

                <td>
                    <nav>
                    <Button className="btn btn-primary" onClick={() => this.props.openActionMaodal(record, "view")}>
                        View
                    </Button>
                    <Button onClick={() => this.props.openActionMaodal(record, "edit")} className="btn btn-primary ml-2">
                        Edit
                    </Button>
                    <Button onClick={() => this.props.openActionMaodal(record, "del")} className="btn btn-danger ml-2">
                        Delete
                    </Button>
                    </nav>
                </td>
            </tr>
        );
    }
};

const mapStateToProps = state => {
    return{
        ...state["ROLE"]
    }
}

export default connect(mapStateToProps, null)(UserListItem);