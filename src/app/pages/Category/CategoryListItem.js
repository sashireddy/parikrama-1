import React from 'react';
import {Button} from 'react-bootstrap';
import {MODULE_INVENTORY} from "../../utils/accessControl";
import isAllowed, {ACTION_VIEW, ACTION_MANAGE, ACTION_DELETE} from "../../utils/accessControl";

export default props => {
  const category = props.record;
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
              {isAllowed(ACTION_VIEW, MODULE_INVENTORY) &&
                  <Button className="btn btn-primary" onClick={() => props.openActionMaodal(category, "view")}>
                      View
                  </Button>
              }
              {isAllowed(ACTION_MANAGE, MODULE_INVENTORY) &&
                  <Button onClick={() => props.openActionMaodal(category, "edit")} className="btn btn-primary ml-2">
                      Edit
                  </Button>
              }
              {isAllowed(ACTION_DELETE, MODULE_INVENTORY) &&
                  <Button onClick={() => props.openActionMaodal(category, "del")} className="btn btn-danger ml-2">
                      Delete
                  </Button>
              }
          </nav>
        </td>
    </tr>
  );
};