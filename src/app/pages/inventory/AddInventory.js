import React from "react"
import {Form,Col} from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import {connect} from 'react-redux'
import Select from 'react-select'

const mapStateToProps = state => ({
    products: state['PRODUCTS']
})

class AddCategory extends React.Component {
    
    constructor(){
        super();
        this.state = {
           inputQuantity : 0,

        }
    }

    componentDidMount(){
        this.setState({...this.props.category});
    }

    handleChange = evt => {
        this.setState({
            ...this.state,
            inputQuantity: evt.target.value
        });
    }

    handleDropDown = (evt,dropDown) => {
        this.setState({
            [dropDown] : evt
        })
    }

    onSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            this.props.onSubmit({...this.state});
        }
        this.props.closeModal();
    }

    handleProductDropDown = evt => {
        this.setState({
            currentProduct: evt[0],
        })
    }

    render() {
        console.log(this.state)
        return (
            <form className="forms-sample" onSubmit={this.onSubmit} >
                <div className="pl-3 pr-3">
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Product</label>
                        <Typeahead 
                            id="Products"
                            key='1'
                            options={['Pens']}
                            onChange={this.handleProductDropDown}
                        />
                    </Form.Group>
                    <Col>
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">Quantity</label>
                        <Form.Control required type="number" className="form-control" id="categoryName" name="name" placeholder="" value={this.state.inputQuantity} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">Please enter a valid quantity</Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                </div>
            </form>
        );
    }
}

export default connect(mapStateToProps,{})(AddCategory);