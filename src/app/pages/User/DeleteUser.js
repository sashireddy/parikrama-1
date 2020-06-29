import React from "react";
import {connect} from "react-redux";

class DeleteUser extends React.Component {
    getRoleLable = role => {
      let roleObj = this.props.allRoles.find(item => item.id === role);
      return roleObj ? roleObj.label : role;
    }

    render() {
      const {record} = this.props;
      return (
        <React.Fragment>
          <div className="pl-3 pr-3">
              <p>Are you sure you want to delete this Record?</p>
              <dl className="dl-horizontal">
                <dt>User Id</dt>
                <dd>{record.id}</dd>
                <dt>User Name</dt>
                <dd>{`${record.firstName} ${record.lastName}`}</dd>
                <dt>Role</dt>
                <dd>{this.getRoleLable(record.role)}</dd>
              </dl>
              <p className="text-warning">This action cannot be undone</p>
          </div>
          <hr className="modal-footer-ruler" />
          <div className="text-right">
            <button className="btn btn-light mr-2" onClick={this.props.closeModal}>Cancle</button>
            <button className="btn btn-danger" onClick={this.props.deleteData}>Delete</button>
          </div>
        </React.Fragment>
      );
    }
}
const mapStateToProps = state => ({
  ...state["ROLE"]
});

export default connect(mapStateToProps, null)(DeleteUser);



