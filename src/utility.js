export const LIST_VIEW = 'list'
export const CHART_VIEW = 'chart'
export const TYPE_EXPENSE = 'expense'
export const TYPE_INCOME = 'income'
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