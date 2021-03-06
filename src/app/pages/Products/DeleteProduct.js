import React from "react";
import {getCategory,getUnit,getLoggedInUserInfo} from '../../utils/dataUtils'
import {getDisabledPayload} from '../../utils/dataUtils'
import ProductActions from '../../actions/productActions'
import Store from '../../store'
function ViewCategory(props) {
    return (
      <React.Fragment>
        <div className="pl-3 pr-3">
            <p>Are you sure you want to Disable this Record?</p>
            <dl className="dl-horizontal">
              <dt>Product Name</dt>
              <dd>{props.record.name}</dd>
              <dt>Category</dt>
              <dd>{getCategory(props.record.category).name}</dd>
              <dt>Unit</dt>
              <dd>{getUnit(props.record.unit).name}</dd>
              <dt>Threshold</dt>
              <dd>{props.record.thresholds[getLoggedInUserInfo().branch]} {getUnit(props.record.unit).name}</dd>
            </dl>
            <p className="text-warning">This action cannot be undone</p>
        </div>
        <hr className="modal-footer-ruler" />
        <div className="text-right">
          <button className="btn btn-light mr-2" onClick={props.closeModal}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>{
            props.closeModal()
            Store.dispatch(ProductActions.updateData(getDisabledPayload(props.record)))}}>Delete</button>
        </div>
      </React.Fragment>
    );
}

export default ViewCategory;



