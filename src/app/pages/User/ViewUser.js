import React from "react";
import dateFormat from "dateformat";
import config from "../../constants/config";

const ViewUser = props => {
  const {record} = props;
  return (
    <React.Fragment>
      <div className="pl-3 pr-3">
          <dl className="dl-horizontal">
            <dt>User Name</dt>
            <dd>{`${record.firstName} ${record.lastName}`}</dd>
            <dt>Role</dt>
            <dd>{record.roleName}</dd>
            <dt>Branch</dt>
            <dd>{record.branchName}</dd>
            <dt>Phone Number</dt>
            <dd>{record.contact}</dd>
            <dt>Status</dt>
            <dd>{record.isActive ? "Active" : "Inactive"}</dd>
            <dt>Email</dt>
            <dd>{record.email}</dd>
            <dt>Created on</dt>
            <dd>{dateFormat(record.createdDate, config.DATE_FORMAT)}</dd>
            <dt>Updated on</dt>
            <dd>{dateFormat(record.lastUpdatedDate, config.DATE_FORMAT)}</dd>
          </dl>
      </div>
      <hr className="modal-footer-ruler" />
      <div className="text-right">
        <button className="btn btn-light mr-2" onClick={() => {props.closeModal()}}>Close</button>
      </div>
    </React.Fragment>
  );
}

export default ViewUser;
