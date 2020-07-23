import React from "react";
import {getBranch, getRole} from '../../utils/dataUtils';

class DeleteUser extends React.Component {
    disableUser = () => {
      const {record} = this.props;
      this.props.updateData({...record, isActive:false});
      this.props.closeModal();
    }

    render() {
      const {record} = this.props;
      return (
        <React.Fragment>
          <div className="pl-3 pr-3">
              <p>Are you sure you want to Disable this User?</p>
              <dl className="dl-horizontal">
                <dt>User Name</dt>
                <dd>{`${record.firstName} ${record.lastName}`}</dd>
                <dt>Role</dt>
                <dd>{getRole(record.role).name}</dd>
                <dt>Branch</dt>
                <dd>{getBranch(record.branch).name}</dd>
                <dt>Phone Number</dt>
                <dd>{record.contact}</dd>
              </dl>
          </div>
          <hr className="modal-footer-ruler" />
          <div className="text-right">
            <button className="btn btn-light mr-2" onClick={this.props.closeModal}>Cancle</button>
            <button className="btn btn-danger" onClick={this.disableUser}>Disable</button>
          </div>
        </React.Fragment>
      );
    }
}

export default DeleteUser;



