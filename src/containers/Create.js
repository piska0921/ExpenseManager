import React from 'react'
import { Tabs, Tab } from '../components/Tabs'
import CategorySelector from '../components/CategorySelector'

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

const Create = () => {
    return (
        <div className="py-3 px-3 mt-4" style={{ backgroundColor: '#fff'}}>
            <Tabs activeIndex={0} onTabChange={() => { }}>
                <Tab>Expense</Tab>
                <Tab>Income</Tab>
            </Tabs>
            <CategorySelector categories={categories} onCategorySelected={() => {}}/>
        </div>)

}

export default Create