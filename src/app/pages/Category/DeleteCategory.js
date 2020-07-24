import React from "react";
import Store from '../../store'
import CategoryActions from "../../actions/categoryActions";
import {getDisabledPayload} from '../../utils/dataUtils'
function ViewCategory(props) {
    return (
      <React.Fragment>
        <div className="pl-3 pr-3">
            <p>Are you sure you want to Disable this Record?</p>
            <dl className="dl-horizontal">
              <dt>Category Name</dt>
              <dd>{props.record.name}</dd>
              <dt>Category description</dt>
              <dd>{props.record.description}</dd>
            </dl>
            <p className="text-warning">This action cannot be undone</p>
        </div>
        <hr className="modal-footer-ruler" />
        <div className="text-right">
          <button className="btn btn-light mr-2" onClick={props.closeModal}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>{
            props.closeModal()
            Store.dispatch(CategoryActions.updateData(getDisabledPayload(props.record)))}}>Delete</button>
        </div>
      </React.Fragment>
    );
}
export default ViewCategory;


