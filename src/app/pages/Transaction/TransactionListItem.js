import React from 'react';

export default props => {
    console.log(props);
    const txn = props.txn;
    return (
        <li className="bg-icon">
            <p className="text-info"><i className="fa fa-clock-o mr-2" /><em>{txn.date}</em> <i className="fa fa-user-o mr-2 ml-2" />{txn.user_id}</p>
            <ul className="list-inline">
                <li>Product: {txn.product}</li>
                <li>Operation: {txn.operation}</li>
                <li>Initial Quantity: {txn.initialQuantity}</li>
                <li>Operational Quantity: {txn.operationalQuantity}</li>
                <li>Closing Quantity: {txn.closingQuantity}</li>
            </ul>
        </li>
    );
};