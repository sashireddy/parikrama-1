import React from "react";
import {getBranch, getRole} from '../../utils/dataUtils';

const ViewUser = props => {
  const {record} = props;
  return (
    <React.Fragment>
      <div className="pl-3 pr-3">
          <dl className="dl-horizontal">
            <dt>User Name</dt>
            <dd>{`${record.firstName} ${record.lastName}`}</dd>
            <dt>Role</dt>
            <dd>{getRole(record.role).name}</dd>
            <dt>Branch</dt>
            <dd>{getBranch(record.branch).name}</dd>
            <dt>Phone Number</dt>
            <dd>{record.contact}</dd>
            <dt>Status</dt>
            <dd>
              {record.isActive
                ? <label className="badge badge-success">Active</label>
                : <label className="badge badge-secondary">In Active</label>
              }
            </dd>
            <dt>Email</dt>
            <dd>{record.email}</dd>
            <dt>Created on</dt>
            <dd>{record.createdDate}</dd>
            <dt>Updated on</dt>
            <dd>{record.lastUpdatedDate}</dd>
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
