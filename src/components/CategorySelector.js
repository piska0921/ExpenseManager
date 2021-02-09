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
        const { categories } = this.props
        const { selectedCategoryId } = this.state
        return (
            <div>
                <div className="row">
                    {categories.map((category, idx) => {
                        const activeClassName = ( selectedCategoryId === category.id) ? 'category_item col-3 active': 'category_item col-3'
                        const bColor = ( selectedCategoryId === category.id) ? '#1c2a4f': '#ccc'
                        const iconColor = ( selectedCategoryId === category.id) ? '#fff': '#555'
                        return (
                            <div className={activeClassName} key={idx} onClick={(event) => this.selectCategory(event, category)}>
                                <Ionicon 
                                 className="rounded-circle mt-2"
                                 fontSize="50px"
                                 color={iconColor}
                                 icon={category.iconName}
                                 style={{ padding: '5px', backgroundColor: bColor}}/>
                                 <p>{category.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default CategorySelector
