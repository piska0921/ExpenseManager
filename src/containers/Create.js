import React from 'react'
import { Tabs, Tab } from '../components/Tabs'
import CategorySelector from '../components/CategorySelector'
import ExpenseForm from '../components/ExpenseForm'
import WithContext from '../WithContext'
import { TYPE_EXPENSE, TYPE_INCOME } from '../utility'
import { withRouter } from "react-router"

export const categories = [
    {
        "id": "1",
        "name": "travel",
        "type": "expense",
        "iconName": "ios-plane"
    },
    {
        "id": "2",
        "name": "finance",
        "type": "expense",
        "iconName": "logo-yen"
    },
    {
        "id": "3",
        "name": "food",
        "type": "expense",
        "iconName": "ios-pizza"
    },
    {
        "id": "4",
        "name": "cloth",
        "type": "expense",
        "iconName": "ios-shirt"
    },

]

const tabContent = [TYPE_EXPENSE, TYPE_INCOME]
class Create extends React.Component {
    constructor(props) {
        super(props)
        const id  = props.match.params.id
        const { categories, items } = props.data
        this.state = {
            selectedTab: (id && items[id]) ? categories[items[id].categoryId].type : TYPE_EXPENSE,
            selectedCategory: (id && items[id]) ? categories[items[id].categoryId] : null,
        }
    }

    changeTab = (idx) => {
        this.setState({
            selectedTab: tabContent[idx]
        })

    }

    selectCategory = (category) => {
        this.setState({
            selectedCategory: category
        })
    }

    cancelForm = () => {
        this.props.history.push('/')
    }

    submitForm = (data, isEdit) => {
        if (!isEdit) {
            this.props.actions.createItem(data, this.state.selectedCategory.id)
        } else {
            this.props.actions.editItem(data, this.state.selectedCategory.id)
        }
        this.props.history.push('/')
    }

    render() {
        const { data } = this.props
        const { items, categories } = data
        const { selectedTab, selectedCategory } = this.state
        //filter categories by currently selected type
        const filteredCategories = Object.keys(categories).
            filter((categoryId) => categories[categoryId].type === selectedTab)
            .map((categoryId) => categories[categoryId])
        //check if it is edit mode
        const id = this.props.match.params.id
        const editItem = (id && items[id]) ? items[id] : {}
        //defualt selected tab index
        const tabIdx = tabContent.findIndex(content => content === selectedTab)

        return (<div className="py-3 px-3 mt-4" style={{ backgroundColor: '#fff' }}>
            <Tabs activeIndex={tabIdx} onTabChange={this.changeTab}>
                <Tab>Expense</Tab>
                <Tab>Income</Tab>
            </Tabs>
            <CategorySelector categories={filteredCategories} onCategorySelected={this.selectCategory} selectedCategory={selectedCategory}/>
            <ExpenseForm onFormSubmit={this.submitForm} onFormCancel={this.cancelForm} editItem={editItem} />
        </div>)
    }



}

export default withRouter(WithContext(Create))