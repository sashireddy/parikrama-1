import React from 'react';

export default props => {
  return (
    <tr>
        <td>{props.category.id}</td>
        <td>{props.category.name}</td>
        <td>{props.category.description}</td>
        <td>View | Edit | Delete</td>
    </tr>
  );
};