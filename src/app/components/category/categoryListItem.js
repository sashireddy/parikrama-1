import React from 'react';
import {Link} from 'react-router-dom';

export default props => {
  return (
    <tr>
        <td>{props.category.id}</td>
        <td>{props.category.name}</td>
        <td>{props.category.description}</td>
        <td>
          <nav className="text-center">
            <Link to={`/category/view/${props.category.id}`} className="btn btn-primary">
              View
            </Link>
            <Link to={`/category/edit/${props.category.id}`} className="btn btn-primary ml-2">
              Edit
            </Link>
            <Link to={`/category/edit/${props.category.id}`} className="btn btn-danger ml-2">
              Delete
            </Link>
          </nav>
        </td>
    </tr>
  );
};