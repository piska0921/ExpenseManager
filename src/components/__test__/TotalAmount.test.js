import React from 'react'
import { shallow } from 'enzyme'
import TotalAmount from '../TotalAmount'

const props = {
    totalExpense: 1000,
    totalIncome: 1000
}

describe('test TotalPrice component', () => {
    it('component should render corret expense&outcome number', () => {
        const wrapper = shallow(<TotalAmount {...props}/>)
        expect(wrapper.find('.expense').text() * 1).toEqual(1000)
        expect(wrapper.find('.income').text() * 1).toEqual(1000)
    })
})