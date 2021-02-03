import React from 'react'
import { shallow } from 'enzyme'
import ExpenseList from '../ExpenseList'
import {categories, items} from '../../containers/Home'
import Ionicon from 'react-ionicons'


const itemsWithCategory = items.map((item) => {
    item.category = categories[item.categoryId]
    return item
})

const props = {
    items: itemsWithCategory,
    //mock a function
    onEditItem: jest.fn(),
    onDeleteItem: jest.fn()
}

let wrapper;
describe('test ExpenseList component', () => {
    beforeEach(() => {
        wrapper = shallow(<ExpenseList {...props}/>)
    })
    it('should render the component to match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('should render corret expense items length', () => {
        expect(wrapper.find('.list-group-item').length).toEqual(itemsWithCategory.length)
    })

    it('should render correct icon and price for each item', () => {
        const iconList = wrapper.find('.list-group-item').first().find(Ionicon)
        expect(iconList.length).toEqual(3)
        expect(iconList.first().props().icon).toEqual(itemsWithCategory[0].category.iconName)
    })
    it('should trigger correct function callbacks', () => {
        const firstItem = wrapper.find('.list-group-item').first()
        firstItem.find('a').first().simulate('click')
        expect(props.onEditItem).toHaveBeenCalledWith(itemsWithCategory[0])
        firstItem.find('a').last().simulate('click')
        expect(props.onDeleteItem).toHaveBeenCalledWith(itemsWithCategory[0].id)

    })
})