import React from 'react'
import PropTypes from 'prop-types'

export class Tabs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: props.activeIndex
        }
    }
    componentDidMount() {
        this.setState({
            activeIndex: this.props.activeIndex
        })
    }
    tabChange = (event, idx) => {
        event.preventDefault()
        this.setState({
            activeIndex: idx
        })
        this.props.onTabChange(idx)
    }
    render() {
        const { children } = this.props
        const { activeIndex } = this.state

        return (
            <ul className="nav nav-tabs nav-fill py-1">
                {React.Children.map(children, (child, idx) => {
                    const tabLinkClass = (activeIndex === idx) ? 'nav-link active' : 'nav-link'
                    return (
                        <li className="nav-item">
                            <a
                                className={tabLinkClass}
                                href="#"
                                onClick={(event) => {this.tabChange(event, idx)}}> {child}</a>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

Tabs.propTypes = {
    activeIndex: PropTypes.number.isRequired,
    onTabChange: PropTypes.func.isRequired
}

export const Tab = ({ children }) =>
    <>{children}</>
