import React,{useState} from "react";
import dateFormat from "dateformat";
import {Button, Collapse} from "react-bootstrap";
import ObjectDiff from "../../utils/objectDiff";
import {getName} from "../../utils/dataUtils";

export default props => {
    const [open, setOpen] = useState(false);
    const txn = props.txn;
    const changes = txn.before && txn.after ? ObjectDiff(txn.before, txn.after) : false;
    console.log(changes);
    return (
        <li className="bg-icon audit-list-item">
            <p className="text-info"><i className="fa fa-clock-o mr-2" /><em>{dateFormat(txn.date, "yyyy-mm-dd HH:MM:ss")}</em> {txn.email && <span><i className="fa fa-user-o mr-2 ml-2" />{txn.email}</span>}</p>
            <div><em>Event:</em> {txn.event}
            {changes && (
                <React.Fragment>
                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls={txn.id}
                        aria-expanded={open} className="ml-4"
                    >{open ? "Hide" : "View"} Difference</Button>
                    <Collapse in={open}>
                        <div id={txn.id}>
                            <DiffView obj={changes} id={txn.id}/>
                        </div>
                    </Collapse>
                </React.Fragment>
            )}
            </div>
        </li>
    );
}

const possibleIds = ["branch", "thresholds", "category"];

const DiffView = props => {
    let obj = props.obj;
    console.log("Diff View", obj);
    return (
        <ul>
            {Object.keys(obj).map((key, i) => {
                if(obj.hasOwnProperty(key)){
                    return (
                        <React.Fragment key={`${props.id}-${key}`}>
                            {obj[key].isLeafNode
                                ? <DiffViewItem key={i} property={key} before={obj[key].before} after={obj[key].after}/>
                                : <li>
                                    <div>
                                        <span className="badge badge-info">{key}</span> :
                                        <DiffView obj={obj[key]} id={props.id} />
                                    </div>
                                  </li>
                            }
                        </React.Fragment>
                    );
                }
                return null;
            })}
        </ul>
    );
}


const DiffViewItem = props => {
    if(Array.isArray(props.before) || Array.isArray(props.after)){
        return null;
    }
    let before;
    let after;
    let property = props.property;
    if(props.property.length === 20){
        property = getName("BRANCH", props.property);
    }
    if(possibleIds.includes(props.property)){
        before = getName(props.property.toUpperCase(), props.before.toString());
        after = getName(props.property.toUpperCase(), props.after.toString());
    } else {
        before = props.before.toString().trim() ? props.before.toString() : <span>&nbsp;</span>;
        after = props.after.toString().trim() ? props.after.toString() : <span>&nbsp;</span>;
    }
    return (
        <li>
            <div>
                <span className="badge badge-info">{property}</span> :
                <span className="badge badge-secondary">{before}</span> <i className="fa fa-long-arrow-right ml-1 mr-2"></i>
                <span className="badge badge-primary">{after}</span>
            </div>
        </li>
    );
}