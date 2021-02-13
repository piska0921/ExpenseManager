import logo from './logo.svg';
import './App.css';
import React from 'react'
import Home, { items } from './containers/Home'
import Create from './containers/Create'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { flattenData, parseToYearAndMonth, generateId } from './utility'
import { testCategories, testItems } from './testData'

export const AppContext = React.createContext()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: flattenData(testCategories),
      items: flattenData(testItems)
    }
    this.actions = {
      deleteItem: (itemId) => {
        delete this.state.items[itemId]
        this.setState({
          items: this.state.items
        })
      },
      createItem: (data, categoryId) => {
        const id = generateId()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = { ...data, id, categoryId }
        this.setState({
          items: { ...this.state.items, [id]: newItem }
        })
      },
      editItem: (item, updatedCategoryId) => {
        const updatedItem = { ...item,
        timestamp: new Date(item.date).getTime(),
        categoryId: updatedCategoryId
      }
      this.setState({
        items: { ...this.state.items, [updatedItem.id]: updatedItem}
      })
      }
    }
  }
  render() {
    return (
      <AppContext.Provider value={{ state: this.state, actions: this.actions }}>
        <Router>
          <div className="App">
            <div className="container pb-5">
              <Route path="/" exact component={Home} />
              <Route path="/create" component={Create} />
              <Route path="/edit/:id" component={Create} />
            </div>
          </div>
        </Router>
      </AppContext.Provider>

    );
  }

}

export default App;
