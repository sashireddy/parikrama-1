import React from 'react'
import {Form, Row, Col,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { Typeahead } from 'react-bootstrap-typeahead'
// import { Doughnut } from 'react-chartjs-2';
import DatePicker from 'react-datepicker'

const branches = {
    headerInfo : 'Branch',
    options : ['Kormangala','Belanduru','Kharkhana']
}
const inventory = {
    headerInfo : 'item',
    options : ['pens', 'pencils', 'erasers']
}
const users = {
    headerInfo : 'user',
    options : ['users1','user2','user3']
}
const summary = 'summary'
const transactionConst = 'transaction'
const createRandomSummaryRow = () => {
    const dateArr = ['10-03-2020','15-03-2020','20-03-2020']
    const categoryArr = ['stationary','furniture','misc']
    const product = ['abcd','defg','ghij']
    const startArr = [10,201,30]
    const endArr = [50,90,30]
    const i = Math.floor((Math.random()*100)%3)
    const i2 = Math.floor((Math.random()*100)%3)
    return {
        date:dateArr[i],
        Category:categoryArr[i2],
        Product:product[i2],
        Start:startArr[i],
        End : endArr[i2],
        consumer : startArr[i]-endArr[i2],
    }
}
const createRandomTransaction = () => {
    const dateArr = ['10-03-2020','15-03-2020','20-03-2020']
    const categoryArr = ['stationary','furniture','misc']
    const product = ['abcd','defg','ghij']
    const i = Math.floor((Math.random()*100)%3)
    const i2 = Math.floor((Math.random()*100)%3)
    return {
        date:dateArr[i],
        Category:categoryArr[i2],
        Product:product[i2],
        source:branches.options[i],
        quantity:5,
        dest : branches.options[i2],
        user : users.options[i2],
    }
}
const transactions = [
    createRandomTransaction(),createRandomTransaction(),createRandomTransaction(),createRandomTransaction(),createRandomTransaction()
]
const SummaryData = [
    createRandomSummaryRow(),createRandomSummaryRow(),createRandomSummaryRow(),createRandomSummaryRow(),createRandomSummaryRow(),createRandomSummaryRow()
]
const CustomDropDown = props => {
    return (
        <Typeahead 
            key='1'
            options={props.info.options}
            onChange={(...data)=>console.log(...data)}
        />
    )
}
class Reports extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            view : summary
        }
    }

    render(){
        return (
            <div>
            <div className="page-header">
                        <h3 className="page-title"> {'Reports'} </h3>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    {'Reports'}
                                </li>
                            </ol>
                    </nav>
                    </div>
            <Row>
            <Col className="col-12 grid-margin stretch-card">
                <div className="card card-statistics">
                  <div className="card-body">
                  <form className="forms-sample">
                      <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col>
                            <button className="btn btn-light">Reset Fliters</button>
                        </Col>
                      
                      </Row>
                      <Row>
                        <Col>
                            <Form.Group>
                                <label>branches</label>
                                <CustomDropDown info={branches}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <label>inventory</label>
                                <CustomDropDown info={inventory} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <label>user</label>
                                <CustomDropDown info={users} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="flexColumn">
                                <label>Start Date</label>
                                <DatePicker 
                                 selected={new Date()}
                                 onChange={(...data)=>{
                                    console.log(...data)}}
                                 />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="flexColumn">
                                <label>End Date</label>
                                <DatePicker 
                                 selected={new Date()}
                                 onChange={(...data)=>{console.log(...data)}}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                        </Col>
                      </Row>
                      
                    </form>
                   </div>
                </div>
            </Col>
            </Row>
            <Row>
                {this.state.view === summary && (
                    <>
                    {/* <Card style={{}}>
                        <Card.Body>
                            <Doughnut data={dataToGraphData(SummaryData)} options={usersDoughnutChartOptions}/>
                        </Card.Body>
                    </Card> */}
                    <Card style={{width:'100%'}}>
                    <Card.Body>
                    <h4>inventory summary report: {new Date().toLocaleDateString()} to {new Date().toLocaleDateString()}</h4>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Product</th>
                                <th>Starting Count</th>
                                <th>Ending Count</th>
                                <th>Items Consumed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SummaryData.map((transaction,idx)=>{
                                return(<tr key={idx} onClick={()=>{this.setState({view :transactionConst})}}>
                                    <td>{transaction.Category}</td>
                                    <td>{transaction.Product}</td>
                                    <td>{transaction.Start}</td>
                                    <td>{transaction.End}</td>
                                    <td>{transaction.consumer}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                    </Card.Body>
                    </Card>
                    </>
                )}
                { this.state.view === transactionConst && (
                    <Card style={{width:'100%'}}>
                        <Card.Header>
                            <button style={{ border: 'none',backgroundColor: 'transparent'}} onClick={()=>this.setState({view :summary})}>back to summary view </button>
                             <h4>inventory Transaction report: {new Date().toLocaleDateString()} to {new Date().toLocaleDateString()}</h4>
                        </Card.Header>
                        <Card.Body>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Category</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Source</th>
                                        <th>Dest</th>
                                        <th>Raised By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction)=>{
                                        return <tr>
                                            <td>{transaction.date}</td>
                                            <td>{transaction.Category}</td>
                                            <td>{transaction.Product}</td>
                                            <td>{transaction.quantity}</td>
                                            <td>{transaction.source}</td>
                                            <td>{transaction.dest}</td>
                                            <td>{transaction.user}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                )}
            </Row>
            
        </div>
        )
    }
}


// const usersDoughnutChartOptions = {
//     cutoutPercentage: 70,
//     animationEasing: "easeOutBounce",
//     animateRotate: true,
//     animateScale: false,
//     responsive: false,
//     maintainAspectRatio: true,
//     showScale: true,
//     legend: {
//       position : 'right',
//       display: true
//     },
//     layout: {
//       padding: {
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0
//       }
//     }
//   };
// const usersDoughnutChartData = {
//     datasets: [{
//       data: [80, 34, 100],
//       backgroundColor: [
//         "#19d895",
//         "#2196f3",
//         "#dde4eb"
//       ],
//       borderColor: [
//         "#19d895",
//         "#2196f3",
//         "#dde4eb"
//       ],
//     }],
//     labels: [
//       'Request',
//       'Email',
//     ]
// };
// const dataToGraphData = (inventory=SummaryData) => {
//     let data = {
//         datasets:[{
//             data : [],
//             backgroundColor:[],
//         }],
//         labels:[]
//     }
//     inventory.forEach((summary,idx) => {
//         data.datasets[0].data.push(idx)
//         data.datasets[0].backgroundColor.push('#'+Math.floor(Math.random()*16777215).toString(16))
//         data.labels.push(summary.Product)
//     })
//     console.log(data)
//     return data
// }

export default Reports