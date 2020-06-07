import React from "react";

function ViewCategory(props) {
  const category = props.data
    return (
      <React.Fragment>
        <div className="pl-3 pr-3">
            <p>Are you sure you want to delete this Record?</p>
            <dl className="dl-horizontal">
              <dt>Category Id</dt>
              <dd>{category._id}</dd>
              <dt>Category Name</dt>
              <dd>{category.name}</dd>
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



