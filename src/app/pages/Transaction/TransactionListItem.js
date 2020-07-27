import React from 'react';
import dateFormat from "dateformat";
import {getOperation} from '../../utils/dataUtils';

export default props => {
    const txn = props.txn;
    return (
        <li className="bg-icon">
            <p className="text-info"><i className="fa fa-clock-o mr-2" /><em>{dateFormat(txn.date, "yyyy-mm-dd HH:MM:ss")}</em> <i className="fa fa-user-o mr-2 ml-2" />{txn.user}</p>
            <ul className="list-inline">
                <li><em>Product:</em> {txn.productName}</li>
                <li><em>Operation:</em> {getOperation(txn.operation).label}</li>
                <li><em>Initial Quantity:</em> {txn.initialQuantity}</li>
                <li><em>Operational Quantity:</em> {txn.operationalQuantity}</li>
                <li><em>Closing Quantity:</em> {txn.closingQuantity}</li>
                {txn.fromBranchName && <li><em>From Branch:</em> {txn.fromBranchName}</li>}
                {txn.toBranchName && <li><em>To Branch:</em> {txn.toBranchName}</li>}
                <li><em>Note:</em> {txn.note}</li>
            </ul>
        </li>
    );
};