import React from "react";

function ViewBranch(props) {
  console.log(props)
    return (
      <React.Fragment>
        <div className="pl-3 pr-3">
            <dl className="dl-horizontal">
              <dt>Branch</dt>
              <dd>{props.record.name}</dd>
              <dt>Street</dt>  
              <dd>{props.record.address.street}</dd>
              <dt>City</dt>
              <dd>{props.record.address.city}</dd>
              <dt>State</dt>
              <dd>{props.record.address.state}</dd>
              <dt>Country</dt>
              <dd>{props.record.address.country}</dd>
              <dt>Zip</dt>
              <dd>{props.record.address.zipcode}</dd>
            </dl>
        </div>
        <hr className="modal-footer-ruler" />
        <div className="text-right">
          <button className="btn btn-light mr-2" onClick={() => {props.closeModal()}}>Close</button>
        </div>
      </React.Fragment>
    );
}

export default ViewBranch;
