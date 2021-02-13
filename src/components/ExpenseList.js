import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'

const ExpenseList = ({ items, onEditItem, onDeleteItem }) => {
    return (
        <ul className="list-group list-group-flush">
            {
                items.map((item) => <li 
                className="list-group-item d-flex justify-content-between align-items-center"
                key={item.id}>
                    <span className="col-1">
                        <Ionicon
                        className="rounded-circle"
                        fontSize="30px"
                        style={{ backgroundColor: '#007bff', padding: '5px'}}
                        color={'#fff'}
                        icon={item.category.iconName}/>
                    </span>
                    <span className="col-5">
                        {item.title}
                    </span>  
                    <span className="col-2 font-weight-bold">
                        {item.category.type === "income" ? "+" : "-"} ${item.amount}
                    </span>    
                    <span className="col-2">
                        {item.date}
                    </span> 
                    <a className="col-1" 
                    onClick={(event) => onEditItem(event, item)}
                    href="#">
                        <Ionicon
                        className="rounded-circle"
                        fontSize="30px"
                        style={{ backgroundColor: '#28a745', padding: '5px'}}
                        color={'#fff'}
                        icon="ios-create-outline"/>
                    </a>    
                    <a className="col-1" 
                    onClick={() => onDeleteItem(item.id)}
                    href="#">
                        <Ionicon
                        className="rounded-circle"
                        fontSize="30px"
                        style={{ backgroundColor: '#dc3545', padding: '5px'}}
                        color={'#fff'}
                        icon="ios-close"/>
                    </a>              
                </li>)
            }
        </ul>
    )
}

ExpenseList.propTypes = {
    items: PropTypes.array.isRequired,
    onEditItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired
}

ExpenseList.defaultProps = {
    onEditItem: () => {},
    onDeleteItem: () => {}
}
export default ExpenseList