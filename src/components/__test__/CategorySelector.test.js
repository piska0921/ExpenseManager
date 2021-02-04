import React from 'react'
import Ionicon from 'react-ionicons'
import {mount} from 'enzyme'
import CategorySelector from '../CategorySelector'

const categories = [
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
    }
]

let props = {
    categories,
    onCategorySelected: jest.fn()
}

let props_with_category = {
    categories,
    onCategorySelected: jest.fn(),
    selectedCategory: categories[0]
}

describe('test CategorySelector component', () => {
    const wrapper = mount(<CategorySelector {...props}/>)
    it('should render correct items', () => {
        expect(wrapper.find('.category_item').length).toEqual(categories.length)
        expect(wrapper.find('.category_item.active').length).toEqual(0)
        const firstIcon = wrapper.find('.category_item').first().find(Ionicon)
        expect(firstIcon.length).toEqual(1)
        expect(firstIcon.props().icon).toEqual(categories[0].iconName)
    })
    it('should render highlighted items if with selected category ', () => {
        const wrapper = mount(<CategorySelector {...props_with_category}/>)
        expect(wrapper.find('.category_item').first().hasClass('active')).toEqual(true)
    })
    it('click the item should turn item to active and trigger callback function', () => {
        const wrapper = mount(<CategorySelector {...props_with_category}/>)
        wrapper.find('.category_item').at(1).simulate('click')
        expect(wrapper.find('.category_item').at(1).hasClass('active')).toEqual(true)
        expect(wrapper.find('.category_item').first().hasClass('active')).toEqual(false)
        expect(props_with_category.onCategorySelected).toHaveBeenLastCalledWith(categories[1])
    })


})