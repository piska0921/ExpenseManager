import React from 'react'
import PropTypes from 'prop-types'
import { validateDate } from '../utility'

class ExpenseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editItem: props.editItem,
            isValidated: true,
            errorMsg: '',
            isEdit: !(props.editItem && Object.keys(props.editItem).length === 0)
        }
    }

    submitForm = (event) => {
        const isEdit = this.state.isEdit
        const title = this.titleInput.value.trim()
        const amount = this.amountInput.value.trim() * 1
        const date = this.dateInput.value.trim()
        event.preventDefault()
        if (title && amount && date) {
            if (amount <= 0) {
                this.setState({
                    isValidated: false,
                    errorMsg: 'Amount must be greater than 0'
                })
            } else if (!validateDate(date)) {
                this.setState({
                    isValidated: false,
                    errorMsg: 'Please enter correct date'
                })
            } else {
                if (!isEdit) {
                    const data = { title, amount, date }
                    this.props.onFormSubmit(data, isEdit)
                } else {
                    delete this.props.editItem.category
                    this.props.onFormSubmit({...this.props.editItem, title, amount, date}, isEdit)
                }
            }
        } else {
            this.setState({
                isValidated: false,
                errorMsg: 'Please fill in all required fields'
            })
        }

    }
    render() {
        const {editItem} = this.props
        return (
            <form style={{ textAlign: 'left' }} onSubmit={(event) => { this.submitForm(event) }} noValidate>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text" className="form-control"
                        id="title" placeholder="Please enter title"
                        defaultValue={(Object.keys(editItem).length === 0) ? '' : editItem.title}
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
                            defaultValue={(Object.keys(editItem).length === 0) ? '' : editItem.amount}
                            ref={(input) => { this.amountInput = input }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date" className="form-control"
                        id="date" placeholder="Please choose date"
                        defaultValue={(Object.keys(editItem).length === 0) ? '' : editItem.date}
                        ref={(input) => { this.dateInput = input }}
                    />
                </div>
                <button type="submit" className="btn btn-primary mr-3">Save</button>
                <button className="btn btn-secondary" onClick={this.props.onFormCancel}>Cancel</button>
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