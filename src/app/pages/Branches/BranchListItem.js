import React from 'react';
import {Button} from 'react-bootstrap';

export default props => {
  const address = (address) => {
    return address.street +' , '+ address.city+' , '+address.state+' , '+address.country+' , '+address.zipcode
  }
  console.log(props)
  return (
    <tr>
        <td className="d-none d-sm-table-cell">{props.record.branch}</td>
        <td className="d-none d-sm-table-cell">
          <div className="text-truncate">{address(props.record.address)}</div>
        </td>
        <td>
            {props.record.isActive
              ? <label className="badge badge-success">Active</label>
              : <label className="badge badge-warning">In Active</label>
            }
            {props.record.isHeadOffice && <label className="badge badge-warning">Head Office</label>}
        </td>
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