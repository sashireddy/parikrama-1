import React from "react";

class ViewCategory extends React.PureComponent {
    disableUnit = () => {
      const {record} = this.props;
      this.props.updateData({...record, isActive:false});
      this.props.closeModal();
    }

    render() {
      return (
        <React.Fragment>
          <div className="pl-3 pr-3">
              <dl className="dl-horizontal">
                <dt>Name</dt>
                <dd>{this.props.record.name}</dd>
                <dt>Description</dt>
                <dd>{this.props.record.description}</dd>
                <dt>Status</dt>
                <dd>{this.props.record.isActive ? "Active" : "Inactive"}</dd>
              </dl>
          </div>
          <hr className="modal-footer-ruler" />
          <div className="text-right">
            <button className="btn btn-light mr-2" onClick={this.props.closeModal}>Close</button>
            <button className="btn btn-primary mr-2" onClick={this.disableUnit} > Disable</button>
          </div>
        </React.Fragment>
      );
    }
}

export default ViewCategory;
