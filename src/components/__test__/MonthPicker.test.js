import React from 'react'
import ReactDOM from 'react-dom'
import {mount} from 'enzyme'
import MonthPicker from '../MonthPicker'

const props = {
    year: 2020,
    month: 12,
    onChangeDate: jest.fn()
}

let wrapper


describe('test MonthPicker component', () => {
    beforeEach(() => {
        wrapper = mount( <MonthPicker {...props}/>)
    })

    it('should render the component to match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('render the correct year and month, show correct dropdown status', () => {
        const text = wrapper.find('.dropdown-toggle').text()
        expect(text).toEqual('2020/ 12')
        expect(wrapper.find('.dropdown-menu').length).toEqual(0)
        expect(wrapper.state('isDroppedDown')).toEqual(false)
        expect(wrapper.state('selectedYear')).toEqual(props.year)
    })

    it('after clicking the button, the menu should be dropped down, and year list & month list should be correct', () => {
        wrapper.find('.dropdown-toggle').simulate('click')
        expect(wrapper.find('.dropdown-menu').length).toEqual(1)
        expect(wrapper.state('isDroppedDown')).toEqual(true)
        expect(wrapper.find('.year_list .dropdown-item').length).toEqual(9)
        expect(wrapper.find('.month_list .dropdown-item').length).toEqual(12)
        expect(wrapper.find('.year_list .dropdown-item.active').text()).toEqual('2020')
        expect(wrapper.find('.month_list .dropdown-item.active').text()).toEqual('12')
        expect(wrapper.find('.year_list .dropdown-item').first().text()).toEqual(`${props.year - 4}`)
        expect(wrapper.find('.month_list .dropdown-item').first().text()).toEqual('01')
    })

    it('after clicking year/month item, right status change should be triggered', () => {
        wrapper.find('.dropdown-toggle').simulate('click')
        wrapper.find('.year_list .dropdown-item').first().simulate('click')
        expect(wrapper.find('.year_list .dropdown-item').first().hasClass('active')).toEqual(true)
        expect(wrapper.state('selectedYear')).toEqual(`${props.year - 4}` * 1)
        wrapper.find('.month_list .dropdown-item').first().simulate('click')
        expect(wrapper.find('.dropdown-menu').length).toEqual(0)
        expect(wrapper.state('isDroppedDown')).toEqual(false)
        expect(props.onChangeDate).toHaveBeenCalledWith(`${props.year - 4}` * 1, 1)
    })

    it('click document should close dropdown menu', () => {
        let eventMap = {}
        document.addEventListener = jest.fn((event, callback) => {
            eventMap[event] = callback
        })
        //addEventListent is called in componentDidMount
        wrapper = mount( <MonthPicker {...props}/> )
        wrapper.find('.dropdown-toggle').simulate('click')
        expect(wrapper.find('.dropdown-menu').length).toEqual(1)
        expect(wrapper.state('isDroppedDown')).toEqual(true)
        eventMap.click({
            target: ReactDOM.findDOMNode(wrapper.instance())
        })
        expect(wrapper.state('isDroppedDown')).toEqual(true)
        eventMap.click({
            target: document
        })
        expect(wrapper.state('isDroppedDown')).toEqual(false)

    })
})