import React from "react";
import dateFormat from "dateformat";
import {Button, Collapse} from "react-bootstrap";
import axios from 'axios';
import config from "../../constants/config";
import {getOperation} from '../../utils/dataUtils';
import Spinner from "../../shared/Spinner";


class TransactionListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            loading: false,
            relatedTxn: null
        }
    }

    toggleState = () => {
        this.setState({open: !this.state.open});
        if(!this.state.relatedTxn){
            this.setState({loading: true});
            this.getRelatedTransactions();
        }
    }

    getRelatedTransactions = async () => {
        if(this.state.relatedTxn){
            return this.state.relatedTxn;
        }
        const txnId = this.props.txn.transactionId;
        let url = `${config.API.TRANSACTIONS.GET_TRANSACTIONS}/${this.props.branch}?transactionId=${txnId}`;
        const res = await axios.get(url);
        console.log(res);
        this.setState({
            relatedTxn: res.data.transactions,
            loading: false
        });
    }

    render() {
        const txn = this.props.txn;
        return (
            <li className="bg-icon">
                <Spinner loading={this.state.loading} />
                <p className="text-info"><i className="fa fa-clock-o mr-2" /><em>{dateFormat(txn.date, config.DATE_FORMAT)}</em> <i className="fa fa-user-o mr-2 ml-2" />{txn.user}</p>
                <ul className="list-inline">
                    <li><em>Product:</em> {txn.productName}</li>
                    <li><em>Operation:</em> {getOperation(txn.operation).label}</li>
                    <li><em>Initial Quantity:</em> {txn.initialQuantity}</li>
                    <li><em>Operational Quantity:</em> {txn.operationalQuantity}</li>
                    <li><em>Closing Quantity:</em> {txn.closingQuantity}</li>
                    {txn.fromBranchName && <li><em>From Branch:</em> {txn.fromBranchName}</li>}
                    {txn.toBranchName && <li><em>To Branch:</em> {txn.toBranchName}</li>}
                    <li><em>Note:</em> {txn.note}</li>
                    {/* {txn.transactionId && (<li><Button
                            onClick={this.toggleState}
                            aria-controls={txn.id}
                            aria-expanded={this.state.open} className="btn btn-link"
                        >Related Transactions</Button></li>)} */}
                </ul>
                {/* {txn.transactionId && (
                    <Collapse in={this.state.open}>
                        <div id={txn.id}>
                            <p className="h6">Related Transactions</p>
                            {this.state.relatedTxn.map(txn => {

                            })}
                        </div>
                    </Collapse>
                )} */}
            </li>
        );
    }
};

export default TransactionListItem;