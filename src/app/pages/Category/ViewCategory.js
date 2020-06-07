import React from "react";

function ViewCategory(props) {
  const category = props.data
    return (
      <React.Fragment>
        <div className="pl-3 pr-3">
            <dl className="dl-horizontal">
              <dt>Category Id</dt>
              <dd>{category._id}</dd>
              <dt>Category Name</dt>
              <dd>{category.name}</dd>
              <dt>Description</dt>
              <dd>{category.description}</dd>
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
