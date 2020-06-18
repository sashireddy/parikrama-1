import React from 'react';
import {Button} from 'react-bootstrap';

export default props => {
  let {record} = props;
  return (
    <tr>
        <td>{`${record.firstName} ${record.lastName}`}</td>
        <td className="d-none d-sm-table-cell">{record.email}</td>
        <td>
          {record.isActive
            ? <label className="badge badge-success">Active</label>
            : <label className="badge badge-warning">In Active</label>
          }
        </td>
        <td>{record.contact}</td>
        <td>
          <nav>
            <Button className="btn btn-primary" onClick={() => props.openActionMaodal(record, "view")}>
              View
            </Button>
            <Button onClick={() => props.openActionMaodal(record, "edit")} className="btn btn-primary ml-2">
              Edit
            </Button>
            <Button onClick={() => props.openActionMaodal(record, "del")} className="btn btn-danger ml-2">
              Delete
            </Button>
          </nav>
        </td>
    </tr>
  );
};