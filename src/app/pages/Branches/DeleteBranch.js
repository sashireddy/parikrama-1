import React from "react";

function ViewCategory(props) {
    return (
      <React.Fragment>
        <div className="pl-3 pr-3">
            <p>Are you sure you want to delete this Record?</p>
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
            <p className="text-warning">This action cannot be undone</p>
        </div>
        <hr className="modal-footer-ruler" />
        <div className="text-right">
          <button className="btn btn-light mr-2" onClick={props.closeModal}>Cancel</button>
          <button className="btn btn-danger" onClick={props.deleteData}>Delete</button>
        </div>
      </React.Fragment>
    );
}

export default ViewCategory;



