import React from 'react'
import ExpenseList from '../components/ExpenseList'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import TotalAmount from '../components/TotalAmount'
import { Tabs, Tab } from '../components/Tabs'
import { LIST_VIEW, CHART_VIEW, TYPE_EXPENSE, TYPE_INCOME, parseToYearAndMonth, padLeft } from '../utility'
import Ionicon from 'react-ionicons'
import WithContext from '../WithContext'
import { withRouter } from "react-router"

// export const categories = {
//     "1": {
//         "id": "1",
//         "name": "travel",
//         "type": "expense",
//         "iconName": "ios-plane"
//     },
//     "2": {
//         "id": "2",
//         "name": "finance",
//         "type": "expense",
//         "iconName": "logo-yen"
//     }
// }
// export const items = [
//     {
//         "id": "1",
//         "title": "travel to New Zealand",
//         "date": "2020-09-11",
//         "amount": 2300,
//         "categoryId": "1"
//     },
//     {
//         "id": "2",
//         "title": "Purchase Stock",
//         "date": "2020-09-11",
//         "amount": 500,
//         "categoryId": "2"
//     }
// ]

// const newItem = {
//     "id": "3",
//     "title": "travel to Sydney",
//     "date": "2020-12-12",
//     "amount": 1000,
//     "categoryId": "1"
// }

const tabContent = [LIST_VIEW, CHART_VIEW]

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // items,
            currentDate: parseToYearAndMonth(),
            displayTab: tabContent[0]
        }
    }


    changeDisplay = (tabIdx) => {
        this.setState({
            displayTab: tabContent[tabIdx]
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

    editItem = (event, editItem) => {
        // const editedItems = this.state.items.map(item => {
        //     if (item.id === editItem.id) {
        //         return { ...item, title: 'edited' }
        //     }
        //     return item
        // })
        // this.setState({
        //     items: editedItems
        // })
        event.preventDefault()
        this.props.history.push(`/edit/${editItem.id}`)
    }

    createItem = () => {
        // this.setState({
        //     items: [newItem, ...this.state.items]
        // })
        this.props.history.push('/create')
    }

    deleteItem = (targetId) => {
        // const filteredItems = this.state.items.filter(item => item.id !== targetId)
        // this.setState({
        //     items: filteredItems
        // })
        this.props.actions.deleteItem(targetId)
    }

    render() {
        const { data } = this.props
        const { items, categories} = data
        const { currentDate, displayTab } = this.state
        const itemsWithCategory = Object.values(items).map((item) => {
            item.category = categories[item.categoryId]
            return item
        }).filter(item => {
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
                    <Tabs activeIndex={0} onTabChange={this.changeDisplay}>
                        <Tab>
                            <Ionicon
                                className="rounded-circle mr-2"
                                fontSize="25px"
                                color={'#007bff'}
                                icon='ios-paper' />
                                        List
                                   </Tab>
                        <Tab>
                            <Ionicon
                                className="rounded-circle mr-2"
                                fontSize="25px"
                                color={'#007bff'}
                                icon='ios-pie' />
                                        Chart
                                   </Tab>
                    </Tabs>
                    {/* <DisplayTab activeTab={displayTab} onTabChange={this.changeDisplay} /> */}
                    <CreateBtn onCreateClicked={this.createItem} />
                    {displayTab === LIST_VIEW &&
                        <ExpenseList items={itemsWithCategory} onEditItem={this.editItem} onDeleteItem={this.deleteItem} />}
                    {displayTab === CHART_VIEW &&
                        <h1>CHART</h1>}

                </div>
            </>)
    }
}

export default withRouter(WithContext(Home))