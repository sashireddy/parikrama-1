import React from "react";

function ViewCategory(props) {
    return (
      <React.Fragment>
        <div className="pl-3 pr-3">
            <dl className="dl-horizontal">
              <dt>Category Id</dt>
              <dd>{props.category._id}</dd>
              <dt>Category Name</dt>
              <dd>{props.category.name}</dd>
              <dt>Description</dt>
              <dd>{props.category.description}</dd>
            </dl>
        </div>
        <hr className="modal-footer-ruler" />
        <div className="text-right">
          <button className="btn btn-light mr-2" onClick={() => {props.closeModal()}}>Close</button>
        </div>
      </React.Fragment>
    );
}

export default ViewCategory;
