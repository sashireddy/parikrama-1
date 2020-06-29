import React from 'react';
import {Button} from 'react-bootstrap';

export default props => {
  return (
    <tr>
        <td>{props.record.label}</td>
        <td className="d-none d-sm-table-cell">{props.record.description}</td>
        <td>
          {props.record.isActive
            ? <label className="badge badge-success">Active</label>
            : <label className="badge badge-warning">In Active</label>
          }
        </td>
        <td>
          <nav>
            <Button className="btn btn-primary" onClick={() => props.openActionMaodal(props.record, "view")}>
              View
            </Button>
            <Button onClick={() => props.openActionMaodal(props.record, "edit")} className="btn btn-primary ml-2">
              Edit
            </Button>
            <Button onClick={() => props.openActionMaodal(props.record, "del")} className="btn btn-danger ml-2">
              Delete
            </Button>
          </nav>
        </td>
    </tr>
  );
};