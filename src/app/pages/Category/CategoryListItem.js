import React from 'react';
import {Button} from 'react-bootstrap';

export default props => {
  return (
    <tr>
        <td className="d-none d-sm-table-cell">{props.category._id}</td>
        <td>{props.category.name}</td>
        <td className="d-none d-sm-table-cell">
          <div className="text-truncate">{props.category.description}</div>
        </td>
        <td>
          <nav className="text-center">
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