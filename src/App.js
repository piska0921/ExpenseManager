import './App.css';
import React from 'react'
import Home, { items } from './containers/Home'
import Create from './containers/Create'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { flattenData, parseToYearAndMonth, generateId } from './utility'
import { testCategories, testItems } from './testData'
import axios from 'axios'

export const AppContext = React.createContext()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      categories: flattenData(testCategories),
      items: flattenData(testItems),
      currentDate: parseToYearAndMonth()
    }
    const withLoading = (callback) => {
      return (...args) => {
        this.setState({
          isLoading: true
        })
        return callback(...args)
      }
    }
    this.actions = {
      getInitialData: withLoading(async () => {
        this.setState({
          isLoading: true
        })
        const { currentDate } = this.state
        //no need to specify localhost port because of the proxy set in package.json
        const getURLWithDate = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`
        const promiseArr = [axios.get('/categories'), axios.get(getURLWithDate)]
        const results = await Promise.all(promiseArr)
        const [categories, items] = results
        this.setState({
          isLoading: false,
          categories: flattenData(categories.data),
          items: flattenData(items.data)
        })
        return { items, categories }
      }),
      getEditItem: withLoading(async (itemId) => {
        let promiseArr = [axios.get('/categories')]
        if (itemId) {
          const getURLWithID = `/items/${itemId}`
          promiseArr.push(axios.get(getURLWithID))
        }
        const [categories, editItem] = await Promise.all(promiseArr)
        if (itemId) {
          this.setState({
            isLoading: false,
            categories: flattenData(categories.data),
            items: { ...this.state.items, [itemId]: editItem }
          })
        } else {
          this.setState({
            isLoading: false,
            categories: flattenData(categories.data)
          })
        }
        return {
          categories: categories && categories.data,
          editItem: editItem && editItem.data
        }
      }),
      selectNewDate: withLoading(async (year, month) => {
        const getURLWithDate = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
        const items = await axios.get(getURLWithDate)
        this.setState({
          items: flattenData(items.data),
          currentDate: {
            year,
            month
          },
          isLoading: false
        })
      }),
      deleteItem: withLoading(async (itemId) => {
        const deletedItem = await axios.delete(`/items/${itemId}`)
        delete this.state.items[itemId]
        this.setState({
          items: this.state.items
        })
        return deletedItem
      }),
      createItem: withLoading(async (data, categoryId) => {
        const id = generateId()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = await axios.post('/items', { ...data, id, categoryId })
        this.setState({
          isLoading: false,
          items: { ...this.state.items, [id]: newItem.data }
        })
        return newItem.data
      }),
      editItem: withLoading(async (item, updatedCategoryId) => {
        const updatedData = {
          ...item,
          timestamp: new Date(item.date).getTime(),
          categoryId: updatedCategoryId
        }
        const updatedItem = await axios.patch(`items/${item.id}`, updatedData)
        this.setState({
          isLoading: false,
          items: { ...this.state.items, [updatedItem.id]: updatedItem.data }
        })
        return updatedItem.data
      })
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
