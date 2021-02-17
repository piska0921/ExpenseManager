import React from 'react'
import ExpenseList from '../components/ExpenseList'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import TotalAmount from '../components/TotalAmount'
import { Tabs, Tab } from '../components/Tabs'
import Loading from '../components/Loading'
import { LIST_VIEW, CHART_VIEW, TYPE_EXPENSE, TYPE_INCOME, parseToYearAndMonth, padLeft, Colors } from '../utility'
import Ionicon from 'react-ionicons'
import WithContext from '../WithContext'
import { withRouter } from "react-router"
import PieChart from '../components/PieChart'


const tabContent = [LIST_VIEW, CHART_VIEW]

const generateChartData = ( items, categoryType ) => {
    let dataSummedByCategory = {}
    items.filter( item => item.category.type === categoryType).forEach( item => {
        if (dataSummedByCategory[item.categoryId]){
            dataSummedByCategory[item.categoryId].value += item.amount * 1
            dataSummedByCategory[item.categoryId].items.push(item.id)
        }else {
            dataSummedByCategory[item.categoryId] = {
                name: item.category.name,
                items: [item.id],
                value: item.amount * 1
            }
        }
    })
    return Object.values(dataSummedByCategory)
    
}
class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            displayTab: tabContent[0]
        }
    }

    componentDidMount() {
        this.props.actions.getInitialData()
    }

    changeDisplay = (tabIdx) => {
        this.setState({
            displayTab: tabContent[tabIdx]
        })
    }

    changeDate = (year, month) => {
        this.props.actions.selectNewDate(year, month)
        // this.setState({
        //     currentDate: {
        //         year,
        //         month
        //     }
        // })
    }

    editItem = (event, editItem) => {
        event.preventDefault()
        this.props.history.push(`/edit/${editItem.id}`)
    }

    createItem = () => {
        this.props.history.push('/create')
    }

    deleteItem = (targetId) => {
        this.props.actions.deleteItem(targetId)
    }

    render() {
        const { data } = this.props
        const { isLoading, items, categories, currentDate } = data
        const { displayTab } = this.state
        const itemsWithCategory = Object.values(items).map((item) => {
            item.category = categories[item.categoryId]
            return item
        })

        //calculate sum
        let totalIncome = 0, totalExpense = 0
        itemsWithCategory.forEach((item) => {
            if (item.category.type === TYPE_EXPENSE) {
                totalExpense += item.amount
            } else {
                totalIncome += item.amount
            }
        })

        const expenseChartData = generateChartData(itemsWithCategory, TYPE_EXPENSE)
        const incomeChartData = generateChartData(itemsWithCategory, TYPE_INCOME)

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
                <div className="content-area px-3">
                    <CreateBtn onCreateClicked={this.createItem} />
                    {isLoading && <Loading />}
                    {!isLoading && <>
                        {displayTab === LIST_VIEW &&
                            <ExpenseList items={itemsWithCategory} onEditItem={this.editItem} onDeleteItem={this.deleteItem} />}
                        {displayTab === CHART_VIEW &&
                            <div className="d-flex flex-wrap justify-content-around">
                            <PieChart title={`Expense in ${currentDate.year}-${currentDate.month}`} data={expenseChartData}/>
                            <PieChart title={`Income in ${currentDate.year}-${currentDate.month}`} data={incomeChartData}/>
                            </div>}</>}
                </div>
            </>)
    }
}

export default withRouter(WithContext(Home))