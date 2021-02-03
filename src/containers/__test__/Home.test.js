import React from 'react'
import { mount } from 'enzyme'
import Home from  '../Home'

import ExpenseList from '../../components/ExpenseList'
import DisplayTab from '../../components/DisplayTab'
import MonthPicker from '../../components/MonthPicker'
import CreateBtn from '../../components/CreateBtn'
import TotalAmount from '../../components/TotalAmount'
import { LIST_VIEW, CHART_VIEW, TYPE_EXPENSE, TYPE_INCOME, parseToYearAndMonth, padLeft } from '../../utility'

let wrapper
describe('test Home container component', () => {
    beforeEach(() => {
        wrapper = mount(<Home />)
    })
    it('shou;d render the default layout', () => {
        const currentDate = parseToYearAndMonth()
        expect(wrapper.find(ExpenseList).length).toEqual(1)
        expect(wrapper.find(DisplayTab).props().activeTab).toEqual(LIST_VIEW)
        expect(wrapper.find(MonthPicker).props().year).toEqual(currentDate.year)
        expect(wrapper.find(MonthPicker).props().month).toEqual(currentDate.month)
        expect(wrapper.find(ExpenseList).props().items.length).toEqual(0)
    })
    it('click different display tab should change the default display content', () => {
        wrapper.find('.nav-item a').last().simulate('click')
        expect(wrapper.find(DisplayTab).props().activeTab).toEqual(CHART_VIEW)
        expect(wrapper.find(ExpenseList).length).toEqual(0)
        expect(wrapper.find('h1').length).toEqual(1)
    })
    it('change year and month should display correct items', () => {
        wrapper.find('.dropdown-toggle').simulate('click')
        wrapper.find('.year_list .dropdown-item').at(3).simulate('click')
        wrapper.find('.month_list .dropdown-item').at(8).simulate('click')
        expect(wrapper.find(MonthPicker).props().year).toEqual(2020)
        expect(wrapper.find(MonthPicker).props().month).toEqual(9)
        expect(wrapper.find(ExpenseList).props().items.length).toEqual(2)
    })
    // it('click create button should create a new item', () => {
    //     wrapper.find(CreateBtn).simulate('click')
    //     expect(wrapper)
    // })
})