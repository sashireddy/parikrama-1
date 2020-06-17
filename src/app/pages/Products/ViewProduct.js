import React from "react";

function ViewProduct(props) {
    return (
      <React.Fragment>
        <div className="pl-3 pr-3">
            <dl className="dl-horizontal">
              <dt>Role Id</dt>
              <dd>{props.record._id}</dd>
              <dt>Role Name</dt>
              <dd>{props.record.name}</dd>
              <dt>Description</dt>
              <dd>{props.record.description}</dd>
            </dl>
        </div>
        <hr className="modal-footer-ruler" />
        <div className="text-right">
          <button className="btn btn-light mr-2" onClick={() => {props.closeModal()}}>Close</button>
        </div>
      </React.Fragment>
    );
}

export default ViewProduct;
