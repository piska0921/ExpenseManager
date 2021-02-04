import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'

class CategorySelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedCategoryId: props.selectedCategory && props.selectedCategory.id
        }
    }

    selectCategory = (event, category) => {
        event.preventDefault()
        this.setState({
            selectedCategoryId: category.id
        })
        this.props.onCategorySelected(category)
    }

    render() {
        const { categories} = this.props
        const { selectedCategoryId } = this.state
        return (
            <div>
                <div className="row">
                    {categories.map((category, idx) => {
                        const activeClassName = ( selectedCategoryId === category.id) ? 'category_item col-3 active': 'category_item col-3'
                        return (
                            <div className={activeClassName} key={idx} onClick={(event) => this.selectCategory(event, category)}>
                                <Ionicon 
                                 className="rounded-circle"
                                 fontSize="50px"
                                 color="#555"
                                 icon={category.iconName}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default CategorySelector
