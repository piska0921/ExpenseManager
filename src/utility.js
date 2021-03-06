export const LIST_VIEW = 'list'
export const CHART_VIEW = 'chart'
export const TYPE_EXPENSE = 'expense'
export const TYPE_INCOME = 'income'

export const Colors = {
    "navy": "#1c2a4f",
    "blue": "#007bff",
    "lightPurple": "#c9d0ff",
    "purple": "#89a4ff",
    "white": "#ffffff"
}

export const padLeft = (n) => {
    return (n > 0 && n < 10) ? `0${n}` : `${n}`
}
export const generateRangeList = (size, startAt = 0) => {
    const rangeList = []
    for (let i = startAt; i < (startAt + size); i++) {
        rangeList.push(i)
    }
    return rangeList
}

export const parseToYearAndMonth = (str) => {
    const date = str ? new Date(str) : new Date()
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1
    }
}

export const validateDate = (dateString) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/
    return dateString.match(regEx)
}

export const flattenData = (arr) => {
    return arr.reduce((map, item) => {
        map[item.id] = item
        return map
    }, {})
}

export const generateId = () => {
    return "_" + Math.random().toString(36).substr(2, 9)
}
