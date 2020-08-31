import React from "react";
import dateFormat from "dateformat";
import config from "../../constants/config";
import {getProduct} from "../../utils/dataUtils"

function HistoryListItem(props){
    const request = props.txn;
    return (
        <tr key={props.idx}>
            <td>{dateFormat(request.date, config.DATE_FORMAT)}</td>
            <td>{request.user}</td>
            <td>{getProduct(request.product).name}</td>
            <td>{request.operationalQuantity}</td>
            <td>{request.note}</td>
        </tr>
    );
}

export default HistoryListItem;