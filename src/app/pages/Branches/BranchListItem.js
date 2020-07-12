import React,{ Component} from 'react';
import {Button} from 'react-bootstrap';
import {connect } from 'react-redux';
import BranchActions from '../../actions/branchActions'

const enableActionPayload = (record) => {
  record.isActive = true
  return record;
}

class BranchListRender extends Component {
  render () {
    const address = (address) => {
    return address.street +' , '+ address.city+' , '+address.state+' , '+address.country+' , '+address.zipcode
    }
  console.log(this.props)
  return (
    <tr>
        <td className="d-none d-sm-table-cell">{this.props.record.name}</td>
        <td className="d-none d-sm-table-cell">
          <div className="text-truncate">{address(this.props.record.address)}</div>
        </td>
        <td>
            {this.props.record.isActive
              ? <label className="badge badge-success">Active</label>
              : <label className="badge badge-warning">In Active</label>
            }
            {this.props.record.isHeadOffice && <label className="badge badge-warning">Head Office</label>}
        </td>
        <td>
          <nav className="text-center">
            {this.props.record.isActive && (<>
            <Button className="btn btn-primary" onClick={() => this.props.openActionMaodal(this.props.record, "view")}>
              View
            </Button>
            <Button onClick={() => this.props.openActionMaodal(this.props.record, "edit")} className="btn btn-primary ml-2">
              Edit
            </Button>
            <Button onClick={() => this.props.openActionMaodal(this.props.record, "del")} className="btn btn-danger ml-2">
              Disable
            </Button>
            </>)}
            {!this.props.record.isActive && (
              <>
                <Button className="btn btn-primary" onClick={() => this.props.updateData(enableActionPayload(this.props.record))}>Enable</Button>
              </>
            )}
          </nav>
        </td>
    </tr>
  );
  }
};

export default connect(()=>({}),{updateData : BranchActions.updateData})(BranchListRender)