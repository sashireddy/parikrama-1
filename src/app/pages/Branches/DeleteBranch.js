import React from "react";
import {connect} from "react-redux";
import BranchActions from "../../actions/branchActions";

const disableActionPayload = (record) => {
  record.isActive = false
  return record;
}

class ViewCategory extends React.Component{
  render(){
    return (
      <React.Fragment>
        <div className="pl-3 pr-3">
            <p>Are you sure you want to delete this Record?</p>
            <dl className="dl-horizontal">
            <dt>Branch</dt>
              <dd>{this.props.record.name}</dd>
              <dt>Street</dt>  
              <dd>{this.props.record.address.street}</dd>
              <dt>City</dt>
              <dd>{this.props.record.address.city}</dd>
              <dt>State</dt>
              <dd>{this.props.record.address.state}</dd>
              <dt>Country</dt>
              <dd>{this.props.record.address.country}</dd>
              <dt>Zip</dt>
              <dd>{this.props.record.address.zipcode}</dd>
            </dl>
            <p className="text-warning">This action cannot be undone</p>
        </div>
        <hr className="modal-footer-ruler" />
        <div className="text-right">
          <button className="btn btn-light mr-2" onClick={this.props.closeModal}>Cancel</button>
          <button className="btn btn-danger" onClick={()=>{
            this.props.updateData(disableActionPayload(this.props.record))}}>Disable</button>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(()=>({}),{updateData : BranchActions.updateData})(ViewCategory);



