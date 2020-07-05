import React from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux'
import {getCategory,getUnit} from '../../utils/dataUtils'

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
        <td>{getCategory(this.props.record.category).name}</td>
        <td>{threshold}</td>
        <td>{getUnit(this.props.record.unit).name}</td>
        <td>
          <nav className="text-center">
            <Button className="btn btn-primary" onClick={() => this.props.openActionMaodal(this.props.record, "view")}>
              View
            </Button>
            <Button onClick={() => this.props.openActionMaodal(this.props.record, "edit")} className="btn btn-primary ml-2">
              Edit
            </Button>
            <Button onClick={() => this.props.openActionMaodal(this.props.record, "del")} className="btn btn-danger ml-2">
              Delete
            </Button>
          </nav>
        </td>
    </tr>
    )
  }
}

export default connect(mapStateToProps,{})(RowRender)