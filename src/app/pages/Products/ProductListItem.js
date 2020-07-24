import React from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux'
import {getActivePayload} from '../../utils/dataUtils'
import ProductActions from '../../actions/productActions'
import Store from '../../store'
import {MODULE_INVENTORY} from "../../utils/accessControl";
import isAllowed, {ACTION_VIEW, ACTION_MANAGE} from "../../utils/accessControl";

const mapStateToProps = state => ({
  userInfo:state['USER'].loggedInUser,
  category : state['CATEGORY'].allCategories,
  units : state['UNITS'].allRecords
})
class RowRender extends React.Component {
  render() {
    console.log(this.props)
    const threshold = (this.props.record.thresholds && this.props.record.thresholds[this.props.userInfo.branch])|| ''
    return (
      <tr>
        <td className="d-none d-sm-table-cell">{this.props.record.name}</td>
        <td>{this.props.record.categoryName}</td>
        <td>{threshold}</td>
        <td>{this.props.record.unitName}</td>
        <td>
          <nav>
          {this.props.record.isActive && (<>
            {isAllowed(ACTION_VIEW, MODULE_INVENTORY) &&
                <Button className="btn btn-primary" onClick={() => this.props.openActionMaodal(this.props.record, "view")}>
                    View
                </Button>
            }
            {isAllowed(ACTION_MANAGE, MODULE_INVENTORY) &&
                <Button onClick={() => this.props.openActionMaodal(this.props.record, "edit")} className="btn btn-primary ml-2">
                    Edit
                </Button>
            }
            {isAllowed(ACTION_MANAGE, MODULE_INVENTORY) &&
                <Button onClick={() => this.props.openActionMaodal(this.props.record, "del")} className="btn btn-danger ml-2">
                    Disable
                </Button>
            }
            </>)}
            {!this.props.record.isActive && (
              <>
                <Button className="btn btn-primary" onClick={() => Store.dispatch(ProductActions.updateData(getActivePayload(this.props.record)))}>Enable</Button>
              </>
            )}

          </nav>
        </td>
    </tr>
    )
  }
}

export default connect(mapStateToProps,{})(RowRender)