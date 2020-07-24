import React,{ Component} from 'react';
import {Button} from 'react-bootstrap';
import {connect } from 'react-redux';
import BranchActions from '../../actions/branchActions'
import {MODULE_BRANCH} from "../../utils/accessControl";
import isAllowed, {ACTION_VIEW, ACTION_MANAGE} from "../../utils/accessControl";


class BranchListRender extends Component {
  getAddress = () => {
    let address = this.props.record.address;
    return address.city+' ,'+address.state+' ,'+address.zipcode;
  }

  enableRecord = () => {
    let {record} = this.props;
    this.props.updateData({...record, isActive:true});
  }

  render () {
    const {record} = this.props;
    return (
      <tr>
          <td className="d-none d-sm-table-cell">{record.name}</td>
          <td className="d-none d-sm-table-cell">
            <div className="text-truncate">{this.getAddress()}</div>
          </td>
          <td className="d-none d-sm-table-cell">{record.contactPerson}</td>
          <td className="d-none d-sm-table-cell">{record.contact}</td>
          <td>
              {record.isActive ? "Active" : "InActive" }
              {record.isHeadOffice && <span className="ml-2">Head Office</span>}
          </td>
          <td>
            <nav>
              {isAllowed(ACTION_VIEW, MODULE_BRANCH) &&
                  <Button className="btn btn-primary" onClick={() => this.props.openActionMaodal(this.props.record, "view")}>
                      View
                  </Button>
              }
              {isAllowed(ACTION_MANAGE, MODULE_BRANCH) &&
                  <Button disabled={!record.isActive} onClick={record.isActive ? () => this.props.openActionMaodal(record, "edit") : undefined} className="btn btn-primary ml-2">
                      Edit
                  </Button>
              }
              {record.isActive && isAllowed(ACTION_MANAGE, MODULE_BRANCH) &&
                  <Button onClick={() => this.props.openActionMaodal(this.props.record, "del")} className="btn btn-primary ml-2">
                      Disable
                  </Button>
              }
              {!record.isActive && isAllowed(ACTION_MANAGE, MODULE_BRANCH) &&
                  <Button className="btn btn-primary ml-2" onClick={this.enableRecord}>
                    Enable
                  </Button>
              }
            </nav>
          </td>
      </tr>
    );
  }
};


const mapActionToProps = {
  updateData : BranchActions.updateData
};

export default connect(null, mapActionToProps)(BranchListRender)