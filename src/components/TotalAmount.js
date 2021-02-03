import React from 'react'

const TotalAmount = ({ totalExpense, totalIncome }) => {
    return (
        <div className="row d-flex align-items-center" style={{ height: '100%', fontSize: '25px' }}>
            <div className="col d-flex flex-column">
                <div>Total Expense: </div>
                <div className="expense">{totalExpense}</div>
            </div>
            <div className="col">
                <div>Total Income: </div>
                <div className="income">{totalIncome}</div>
            </div>
        </div>
    )
}

export default TotalAmount