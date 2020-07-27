import React from "react";

class ViewCategory extends React.Component {
  disableCategory = () => {
    const {record} = this.props;
    this.props.updateData({...record, isActive:false});
    this.props.closeModal();
  }

  render(){
    const {record} = this.props;
    return (
      <React.Fragment>
        <div className="pl-3 pr-3">
            <p>Are you sure you want to Disable this Record?</p>
            <dl className="dl-horizontal">
              <dt>Category Name</dt>
              <dd>{record.name}</dd>
              <dt>Category description</dt>
              <dd>{record.description}</dd>
              <dt>Status</dt>
              <dd>{this.props.record.isActive ? "Active" : "Inactive"}</dd>
            </dl>
        </div>
        <hr className="modal-footer-ruler" />
        <div className="text-right">
          <button className="btn btn-light mr-2" onClick={this.props.closeModal}>Cancel</button>
          <button className="btn btn-primary" onClick={this.disableCategory}>Disable</button>
        </div>
      </React.Fragment>
    );
  }
}
export default ViewCategory;


