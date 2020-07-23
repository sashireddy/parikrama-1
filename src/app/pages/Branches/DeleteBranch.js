import React from "react";
class ViewCategory extends React.Component{

  disableRecord = () => {
    let {record} = this.props;
    this.props.updateData({...record, isActive: false});
    this.props.closeModal();
  }

  render(){
    let {record} = this.props;
    return (
      <React.Fragment>
        <div className="pl-3 pr-3">
            <p>Are you sure you want to Disable this Record?</p>
            <dl className="dl-horizontal">
            <dt>Branch</dt>
              <dd>{record.name}</dd>
              <dt>Street</dt>
              <dd>{record.address.street}</dd>
              <dt>City</dt>
              <dd>{record.address.city}</dd>
              <dt>State</dt>
              <dd>{record.address.state}</dd>
              <dt>Country</dt>
              <dd>{record.address.country}</dd>
              <dt>Zip</dt>
              <dd>{record.address.zipcode}</dd>
            </dl>
        </div>
        <hr className="modal-footer-ruler" />
        <div className="text-right">
          <button className="btn btn-light mr-2" onClick={this.props.closeModal}>Cancel</button>
          <button className="btn btn-danger" onClick={this.disableRecord}>Disable</button>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewCategory;



