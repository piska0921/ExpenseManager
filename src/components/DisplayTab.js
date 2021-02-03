import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'
import { LIST_VIEW, CHART_VIEW } from '../utility'

const generateTabLinkClass = (currentTab, targetTab) => {
    return (currentTab === targetTab) ? 'nav-link active' : 'nav-link'
}
const DisplayTab = ({ activeTab, onTabChange }) => {
    return (
        <ul className="nav nav-tabs nav-fill ">
            <li className="nav-item">
                <a 
                className={generateTabLinkClass(activeTab, LIST_VIEW)} 
                href="#"
                onClick={(event) => { event. preventDefault(); onTabChange(LIST_VIEW)}}>
                    <Ionicon
                        className="rounded-circle mr-2"
                        fontSize="25px"
                        color={'#007bff'}
                        icon='ios-paper' />
                    List
            </a>
            </li>
            <li className="nav-item">
                <a 
                className={generateTabLinkClass(activeTab, CHART_VIEW)} 
                href="#"
                onClick={(event) => { event. preventDefault(); onTabChange(CHART_VIEW)}}>
                <Ionicon
                        className="rounded-circle mr-2"
                        fontSize="25px"
                        color={'#007bff'}
                        icon='ios-pie' />
                    Chart
            </a>
            </li>
        </ul>
    )
}


DisplayTab.propTypes = {
    activeTab: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired
}
export default DisplayTab

