import React from "react";
import {connect} from "react-redux";

class ViewUser extends React.Component {
  getRoleLable = role => {
    let roleObj = this.props.allRoles.find(item => item.id === role);
    return roleObj ? roleObj.label : role;
  }

  render() {
    const {record} = this.props;
    return (
      <React.Fragment>
        <div className="pl-3 pr-3">
            <dl className="dl-horizontal">
              <dt>User Id</dt>
              <dd>{record.id}</dd>
              <dt>User Name</dt>
              <dd>{`${record.firstName} ${record.lastName}`}</dd>
              <dt>Role</dt>
              <dd>{this.getRoleLable(record.role)}</dd>
              <dt>Branch</dt>
              <dd>{record.branch}</dd>
              <dt>Phone Number</dt>
              <dd>{record.contact}</dd>
              <dt>Status</dt>
              <dd>
                {record.isActive
                  ? <label className="badge badge-success">Active</label>
                  : <label className="badge badge-warning">In Active</label>
                }
              </dd>
              <dt>Email</dt>
              <dd>{record.email}</dd>
            </dl>
        </div>
        <hr className="modal-footer-ruler" />
        <div className="text-right">
          <button className="btn btn-light mr-2" onClick={() => {this.props.closeModal()}}>Close</button>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  ...state["ROLE"]
});

export default connect(mapStateToProps, null)(ViewUser);
