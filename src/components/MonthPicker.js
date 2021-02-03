import React from 'react'
import PropTypes from 'prop-types'
import { padLeft, generateRangeList } from '../utility'

class MonthPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDroppedDown: false,
            selectedYear: this.props.year,
            selectedMonth: this.props.month
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false)
    }

    handleClick = (event) => {
        if (this.node.contains(event.target)) { return }
        this.setState({
            isDroppedDown: false
        })
    }

    toggleDropDown = (event) => {
        event.preventDefault()
        this.setState({
            isDroppedDown: !this.state.isDroppedDown
        })
    }

    selectYear = (event, yearNum) => {
        event.preventDefault()
        this.setState({
            selectedYear: yearNum
        })
    }

    selectMonth = (event, monthNum) => {
        event.preventDefault()
        this.setState({
            selectedMonth: monthNum,
            isDroppedDown: false
        })
        this.props.onChangeDate(this.state.selectedYear, monthNum)
    }
    render() {
        const { year, month } = this.props
        const { isDroppedDown, selectedYear, selectedMonth } = this.state
        const monthList = generateRangeList(12, 1)
        const yearList = generateRangeList(9, -4).map(number => number + year)
        return (
            <div className="dropdown month-picker-component" ref={(ref) => { this.node = ref }}>
                <h5>Choose Month</h5>
                <button className="btn btn-lg btn-secondary dropdown-toggle"
                    onClick={this.toggleDropDown}>
                    {`${selectedYear}/ ${padLeft(selectedMonth)}`}
                </button>
                { isDroppedDown &&
                    <div className="dropdown-menu" style={{ display: 'block' }}>
                        <div className="row">
                            <div className="col border-right year_list">
                                {yearList.map((yearNum, idx) =>
                                    <a key={idx}
                                        href="#"
                                        onClick={(event) => this.selectYear(event, yearNum)}
                                        className={(yearNum === selectedYear) ? "dropdown-item active" : "dropdown-item"}
                                    >
                                        {yearNum}
                                    </a>)}
                            </div>
                            <div className="col month_list">
                                {monthList.map((monthNum, idx) =>
                                    <a key={idx}
                                        onClick={(event) => { this.selectMonth(event, monthNum) }}
                                        className={(monthNum === selectedMonth) ? "dropdown-item active" : "dropdown-item"}>
                                        {padLeft(monthNum)}
                                    </a>)}
                            </div>
                        </div>
                    </div>}
            </div>
        )
    }
}
MonthPicker.propTypes = {
    year: PropTypes.number.isRequired
}
export default MonthPicker