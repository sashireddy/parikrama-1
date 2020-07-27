import React,{useState} from "react";
import dateFormat from "dateformat";
import {Button, Collapse} from "react-bootstrap";

export default props => {
    const [open, setOpen] = useState(false);
    const txn = props.txn;
    return (
        <li className="bg-icon audit-list-item">
            <p className="text-info"><i className="fa fa-clock-o mr-2" /><em>{dateFormat(txn.date, "yyyy-mm-dd HH:MM:ss")}</em> {txn.email && <span><i className="fa fa-user-o mr-2 ml-2" />{txn.email}</span>}</p>
            <div><em>Event:</em> {txn.event}
            {txn.before && txn.after && (
                <React.Fragment>
                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls={txn.id}
                        aria-expanded={open} className="ml-4"
                    >View Difference</Button>
                    <Collapse in={open}>
                        <div id={txn.id}>
                            <ul>{Object.keys(txn.before).map((key, i) => <DiffView key={i} before={txn.before} after={txn.after} property={key}/>)}</ul>
                        </div>
                    </Collapse>
                </React.Fragment>
            )}
            </div>
        </li>
    );
}

const DiffView = (props) => {
    return (
        <li>
            <div>
            <span className="badge badge-info">{props.property}</span> :
            <span className="badge badge-secondary">{JSON.stringify(props.before[props.property])}</span> <i className="fa fa-long-arrow-right ml-1 mr-2"></i>
            <span className="badge badge-primary">{JSON.stringify(props.after[props.property])}</span></div>
        </li>
    );
}