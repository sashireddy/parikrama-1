import React from 'react';
import {Button} from 'react-bootstrap';

export default props => {
  return (
    <tr>
        <td>{props.record.name}</td>
        <td className="d-none d-sm-table-cell">{props.record.description}</td>
        <td>
          <nav>
            <Button className="btn btn-primary" onClick={() => props.openActionMaodal(props.record, "view")}>
              View
            </Button>
          </nav>
        </td>
    </tr>
  );
};