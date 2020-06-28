import React from "react";
import {connect} from "react-redux";

class ViewRole extends React.Component {
  render() {
    console.log('View Role Props: ' ,this.props);
    const {record} = this.props;
    return (
      <React.Fragment>
        <div className="pl-3 pr-3">
            <dl className="dl-horizontal">
              <dt>Role Id</dt>
              <dd>{record.id}</dd>
              <dt>Role Name</dt>
              <dd>{record.label}</dd>
              <dt>Description</dt>
              <dd>{record.description}</dd>
              <dt>Permissions</dt>
              <dd>
                <ul>
                  {this.props.allPermissions
                    .filter(permission => record.permissions.includes(permission.permission))
                    .map((permission, idx) => <li key={permission.id}>{permission.permission}</li>)}
                </ul>
              </dd>
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
  ...state["PERMISSION"]
});

export default connect(mapStateToProps, null)(ViewRole);
