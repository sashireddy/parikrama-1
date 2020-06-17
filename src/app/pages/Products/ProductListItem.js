import React from 'react';
import {Button} from 'react-bootstrap';

export default props => {
  console.log(props);
  return (
    <tr>
        <td className="d-none d-sm-table-cell">{props.record.name}</td>
        <td>{props.record.category}</td>
        <td>
          <nav className="text-center">
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