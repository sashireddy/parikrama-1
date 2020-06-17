import React from 'react';
import {Button} from 'react-bootstrap';

export default props => {
  const category = props.record
  console.log('categoory PROPS',category)
  return (
    <tr>
        <td>{category.name}</td>
        <td className="d-none d-sm-table-cell">
          <div className="text-truncate">{category.description}</div>
        </td>
        <td className="d-none d-sm-table-cell">
          {category.isActive
            ? <label className="badge badge-success">Active</label>
            : <label className="badge badge-warning">In Active</label>
          }
        </td>
        <td>
          <nav>
            <Button className="btn btn-primary" onClick={() => props.openActionMaodal(category, "view")}>
              View
            </Button>
            <Button onClick={() => props.openActionMaodal(category, "edit")} className="btn btn-primary ml-2">
              Edit
            </Button>
            <Button onClick={() => props.openActionMaodal(category, "del")} className="btn btn-danger ml-2">
              Delete
            </Button>
          </nav>
        </td>
    </tr>
  );
};