import React from "react";
import {getCategory,getUnit,getLoggedInUserInfo} from '../../utils/dataUtils'

function ViewProduct(props) {
  console.log(props)
    return (
      <React.Fragment>
        <div className="pl-3 pr-3">
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
        </div>
        <hr className="modal-footer-ruler" />
        <div className="text-right">
          <button className="btn btn-light mr-2" onClick={() => {props.closeModal()}}>Close</button>
        </div>
      </React.Fragment>
    );
}

export default ViewProduct;
