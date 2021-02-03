import React from 'react'
import ExpenseList from '../components/ExpenseList'
import DisplayTab from '../components/DisplayTab'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import TotalAmount from '../components/TotalAmount'
import { LIST_VIEW, CHART_VIEW, TYPE_EXPENSE, TYPE_INCOME, parseToYearAndMonth, padLeft } from '../utility'

export const categories = {
    "1": {
        "id": "1",
        "name": "travel",
        "type": "expense",
        "iconName": "ios-plane"
    },
    "2": {
        "id": "2",
        "name": "finance",
        "type": "expense",
        "iconName": "logo-yen"
    }
}
export const items = [
    {
        "id": "1",
        "title": "travel to New Zealand",
        "date": "2020-09-11",
        "amount": 2300,
        "categoryId": "1"
    },
    {
        "id": "2",
        "title": "Purchase Stock",
        "date": "2020-09-11",
        "amount": 500,
        "categoryId": "2"
    }
]

const newItem = {
    "id": "3",
    "title": "travel to Sydney",
    "date": "2020-12-12",
    "amount": 1000,
    "categoryId": "1"
}

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            items,
            currentDate: parseToYearAndMonth(),
            displayTab: LIST_VIEW
        }
    }


    changeDisplay = (display) => {
        this.setState({
            displayTab: display
        })
    }

    changeDate = (year, month) => {
        this.setState({
            currentDate: {
                year,
                month
            }
        })
    }

    editItem = (editItem) => {
        const editedItems = this.state.items.map(item => {
            if (item.id === editItem.id) {
                return { ...item, title: 'edited' }
            }
            return item
        })
        this.setState({
            items: editedItems
        })
    }

    createItem = () => {
        this.setState({
            items: [newItem, ...this.state.items]
        })
    }

    deleteItem = (targetId) => {
        const filteredItems = this.state.items.filter(item => item.id !== targetId)
        this.setState({
            items: filteredItems
        })
    }

    render() {
        const { items, currentDate, displayTab } = this.state
        const itemsWithCategory = items.map((item) => {
            item.category = categories[item.categoryId]
            return item
        }).filter( item => {
            return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
        })
        let totalIncome = 0, totalExpense = 0
        itemsWithCategory.forEach((item) => {
            if (item.category.type === TYPE_EXPENSE) {
                totalExpense += item.amount
            } else {
                totalIncome += item.amount
            }
        })
        return (
            <>
                <div className="header py-5">
                    <div className="row">
                        <div className="col">
                            <MonthPicker year={currentDate.year} month={currentDate.month} onChangeDate={this.changeDate} />
                        </div>
                        <div className="col">
                            <TotalAmount totalExpense={totalExpense} totalIncome={totalIncome} />
                        </div>
                    </div>
                </div>

                <div className="content-area py-3 px-3">
                    <DisplayTab activeTab={displayTab} onTabChange={this.changeDisplay} />
                    <CreateBtn onCreateClicked={this.createItem} />
                    {displayTab === LIST_VIEW &&
                        <ExpenseList items={itemsWithCategory} onEditItem={this.editItem} onDeleteItem={this.deleteItem} />}
                    {displayTab === CHART_VIEW &&
                        <h1>CHART</h1>}

                </div>
            </>
        )
    }
}

export default Home