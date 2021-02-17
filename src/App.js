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
      categories: {},
      items: {},
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
        const { items, categories } = this.state
        //check if data is already fetched
        let promiseArr = []
        if (Object.keys(categories).length === 0) {
          promiseArr.push(axios.get('/categories'))
        }
        const itemFetched = (Object.keys(items).indexOf(itemId) > -1)
        if (itemId && !itemFetched) {
          const getURLWithID = `/items/${itemId}`
          promiseArr.push(axios.get(getURLWithID))
        }
        //avoid loading same resources repeatedly
        const [fetchedCategories, editItem] = await Promise.all(promiseArr)
        const finalCategories = fetchedCategories ? flattenData(fetchedCategories.data): categories
        const finalItem = editItem ? editItem.data : items[itemId]
        if (itemId) {
          this.setState({
            isLoading: false,
            categories: finalCategories,
            items: { ...this.state.items, [itemId]: finalItem },
          })
        } else {
          this.setState({
            isLoading: false,
            categories: finalCategories
          })
        }
        return {
          categories: finalCategories,
          editItem: finalItem
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
          isLoading: false,
          items: this.state.items
        })
        return deletedItem.data
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
        const updatedItem = await axios.put(`items/${updatedData.id}`, updatedData)
        this.setState({
          isLoading: false,
          items: { ...this.state.items, [updatedData.id]: updatedData }
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
