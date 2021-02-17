import React from 'react'
import { mount } from 'enzyme'
import { Create } from '../Create'
import { parseToYearAndMonth, flattenData } from '../../utility'
import Loading from '../../components/Loading'
import { testCategories, testItems } from '../../testData'
import CategorySelector from '../../components/CategorySelector'
import ExpenseForm from '../../components/ExpenseForm'

const testEditItem = testItems[0]
const createMatch = { params: { id: '' } }
const editMatch = { params: { id: testEditItem.id } }
const history = { push: () => { } }

const initialData = {
    categories: {},
    items: {},
    isLoading: false,
    currentDate: parseToYearAndMonth()
}

const loadingData = {
    ...initialData,
    isLoading: true
}

const loadedData = {
    categories: flattenData(testCategories),
    items: flattenData(testItems),
    isLoading: false,
    currentDate: parseToYearAndMonth
}

const actions = {
    getEditItem: jest.fn().mackReturnValue(Promise.resolve({ categories: flattenData(testCategories), editItem: testEditItem })),
    createItem: jest.fn().mackReturnValue(Promise.resolve(''))
}
describe('test component init behavior', () => {
    const wrapper = mount(<Create data={initialData} actions={actions} match={editMatch} />)

    it('getEditItem should be called with right parameters', () => {
        expect(actions.getEditItem).toHaveBeenCalledWith(testEditItem.id)
    })
    it('should show loading component if isLoading is true', () => {
        expect(wrapper.find(Loading).length).toEqual(1)
    })
})

describe('test component for creating item', () => {
    const wrapper = mount(<Create data={loadedData} actions={actions} match={createMatch} history={history} />)
    it('should pass null to props selectedCategory for CategorySelector', () => {
        expect(wrapper.find(CategorySelector).props().selectedCategory).toEqual(null)
    })
    it('should pass empty object to expense form cimpinent', () => {
        expect(wrapper.find(ExpenseForm).props().editItem).toEqual({})
    })
    it('click submit should not trigger the createItem action', () => {
        wrapper.find('form').simulate('submit')
        expect(actions.createItem).not.toHaveBeenCalled()
    })
    it('click submit should fill in all inputs and select category')

})

describe('test component for editting item', () => {

})