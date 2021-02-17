import React from 'react'
import { mount } from 'enzyme'
import ExpenseForm from '../ExpenseForm'
import { testItems } from '../../testData'

const props = {
    onFormSubmit: jest.fn(),
    onFormCancel: jest.fn(),
    editItem: {}
}

const props_with_editItem = {
    onFormSubmit: jest.fn(),
    onFormCancel: jest.fn(),
    editItem: testItems[0]
}

const getInputValue = (wrapper, selector) => {
    return wrapper.find(selector).instance().value
}
const setInputValue = (wrapper, selector, input) => {
    wrapper.find(selector).instance().value = input
}
let wrapper, wrapper2, formInstance
describe('test expense form component', () => {
    beforeEach(() => {
        wrapper = mount(<ExpenseForm {...props} />)
        wrapper2 = mount(<ExpenseForm {...props_with_editItem} />)
        formInstance = wrapper.find(ExpenseForm).instance()
    })
    it('should render the component to match the snapshot', () => {
        expect(wrapper).toMatchSnapshot()
        expect(wrapper2).toMatchSnapshot()
    })
    describe('should correctly render the component with no editItem', () => {
        it('should render three input boxes, two buttons and one form', () => {
            expect(wrapper.find('input').length).toEqual(3)
            expect(wrapper.find('button').length).toEqual(2)
            expect(wrapper.find('form').length).toEqual(1)
        })
        it('should render input boxes with empty default value', () => {
            expect(getInputValue(wrapper, '#title')).toEqual('')
            expect(getInputValue(wrapper, '#amount')).toEqual('')
            expect(getInputValue(wrapper, '#date')).toEqual('')
        })
        it('submit form with empty input should give alert message and not trigger submit action', () => {
            wrapper.find('form').simulate('submit')
            expect(wrapper.find('.alert').length).toEqual(1)
            expect(formInstance.state.isValidated).toEqual(false)
            expect(props.onFormSubmit).not.toHaveBeenCalled()
        })
        it('submit form with negative amount should give alert message and not trigger submit action', () => {
            setInputValue(wrapper, '#title', 'title input')
            setInputValue(wrapper, '#amount', '-10')
            setInputValue(wrapper, '#date', '2020-12-20')
            wrapper.find('form').simulate('submit')
            expect(wrapper.find('.alert').length).toEqual(1)
            expect(formInstance.state.isValidated).toEqual(false)
            expect(props.onFormSubmit).not.toHaveBeenCalled()
        })
        it('submit form with invalid date should give alert message and not trigger submit action', () => {
            setInputValue(wrapper, '#title', 'title input')
            setInputValue(wrapper, '#amount', '10')
            setInputValue(wrapper, '#date', 'invalid date')
            wrapper.find('form').simulate('submit')
            expect(wrapper.find('.alert').length).toEqual(1)
            expect(formInstance.state.isValidated).toEqual(false)
            expect(props.onFormSubmit).not.toHaveBeenCalled()
        })
        it('submit form with correct inputs should trigger submit action', () => {
            setInputValue(wrapper, '#title', 'title input')
            setInputValue(wrapper, '#amount', '10')
            setInputValue(wrapper, '#date', '2020-12-20')
            wrapper.find('form').simulate('submit')
            const inputItem = {
                title: 'title input',
                amount: 10,
                date: '2020-12-20'
            }
            expect(props.onFormSubmit).toHaveBeenCalledWith(inputItem, false)
        })
        it('click cancel button should trigger cancel action', () => {
            wrapper.find('button').last().simulate('click')
            expect(props.onFormCancel).toHaveBeenCalled()
        })
    })
    describe('should render the component correctly with editItem', () => {
        it('input boxes should be prepopulated with editItem data', () => {
            expect(getInputValue(wrapper2, '#title')).toEqual(testItems[0].title)
            expect(getInputValue(wrapper2, '#amount')).toEqual(testItems[0].amount.toString())
            expect(getInputValue(wrapper2, '#date')).toEqual(testItems[0].date)
        })
        it('submit form with changed value should trigger submit action with correct item', () => {
            setInputValue(wrapper2, '#title', 'new title')
            wrapper2.find('form').simulate('submit')
            const newItem = { ...testItems[0], title: 'new title'}
            expect(props_with_editItem.onFormSubmit).toHaveBeenCalledWith(newItem, true)
        })
    })

})