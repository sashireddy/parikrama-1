import React from "react";

function ViewCategory(props) {
    const {record} = props;
    return (
      <React.Fragment>
        <div className="pl-3 pr-3">
            <p>Are you sure you want to delete this Record?</p>
            <dl className="dl-horizontal">
              <dt>Role Id</dt>
              <dd>{record.id}</dd>
              <dt>Role Name</dt>
              <dd>{record.name}</dd>
              <dt>Description</dt>
              <dd>{record.description}</dd>
            </dl>
            <p className="text-warning">This action cannot be undone</p>
        </div>
        <hr className="modal-footer-ruler" />
        <div className="text-right">
          <button className="btn btn-light mr-2" onClick={props.closeModal}>Cancle</button>
          <button className="btn btn-danger" onClick={props.deleteData}>Delete</button>
        </div>
      </React.Fragment>
    );
}

export default ViewCategory;



