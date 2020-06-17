import React from 'react';
import {Button} from 'react-bootstrap';

export default props => {
  return (
    <tr>
        <td>{props.category.label}</td>
        <td className="d-none d-sm-table-cell">{props.category.description}</td>
        <td>
          {props.category.isActive
            ? <label className="badge badge-success">Active</label>
            : <label className="badge badge-warning">In Active</label>
          }
        </td>
        <td>
          <nav>
            <Button className="btn btn-primary" onClick={() => props.openActionMaodal(props.category, "view")}>
              View
            </Button>
            <Button onClick={() => props.openActionMaodal(props.category, "edit")} className="btn btn-primary ml-2">
              Edit
            </Button>
            <Button onClick={() => props.openActionMaodal(props.category, "del")} className="btn btn-danger ml-2">
              Delete
            </Button>
          </nav>
        </td>
    </tr>
  );
};