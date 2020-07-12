import React from 'react';
import dateFormat from "dateformat";

export default props => {
    const txn = props.txn;
    return (
        <li className="bg-icon">
            <p className="text-info"><i className="fa fa-clock-o mr-2" /><em>{dateFormat(txn.date, "yyyy-mm-dd HH:MM:ss")}</em> <i className="fa fa-user-o mr-2 ml-2" />{txn.user}</p>
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