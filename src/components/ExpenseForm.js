import React from 'react'
import PropTypes from 'prop-types'
import {validateDate} from '../utility'

class ExpenseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editItem: props.editItem,
            isValidated: true,
            errorMsg: ''
        }
    }

    submitForm = (event) => { 
        const title = this.titleInput.value.trim()
        const amount = this.amountInput.value.trim() * 1
        const date = this.dateInput.value.trim()

        if ( title && amount && date ){
            if (amount <= 0) {
                this.setState({
                    isValidated: false,
                    errorMsg: 'Amount must be greater than 0'               
                })
            }else if (!validateDate(date)){
                this.setState({
                    isValidated: false,
                    errorMsg: 'Please enter correct date'               
                })
            }else {
                this.props.onFormSubmit()
            }
        } else {
            this.setState({
                isValidated: false,
                errorMsg: 'Please fill in all required fields'
            })
        }
        event.preventDefault()
    }
    render() {
        return (
            <form style={{ textAlign: 'left' }} onSubmit={(event) => { this.submitForm(event) }} noValidate>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text" className="form-control"
                        id="title" placeholder="Please enter title"
                        defaultValue=''
                        ref={(input) => { this.titleInput = input }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input
                            type="number" className="form-control"
                            id="amount" placeholder="Please enter amount"
                            defaultValue=''
                            ref={(input) => { this.amountInput = input }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date" className="form-control"
                        id="date" placeholder="Please choose date"
                        defaultValue=''
                        ref={(input) => { this.dateInput = input }}
                    />
                </div>
                <button type="submit" className="btn btn-primary mr-3">Save</button>
                <button className="btn btn-secondary">Cancel</button>
                { !this.state.isValidated && <div className="alert alert-danger mt-5" role="alert">{this.state.errorMsg}</div>}
            </form>

        )
    }
}

ExpenseForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    onFormCancel: PropTypes.func.isRequired,
    editItem: PropTypes.object
}

ExpenseForm.defaultProps = {
    editItem: {}
}

export default ExpenseForm