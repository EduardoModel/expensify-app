import {createStore, combineReducers} from 'redux'
import uuid from 'uuid'

//ADD_EXPENSE
const addExpense = ({
        description = '', 
        note = ''
        , amount = 0
        , createdAt = 0
    } = {}) => ({
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description,
            note,
            amount,
            createdAt
    }
})

//REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

//SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
}) 

//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

//SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

//SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})

//Get Visible Expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1
        }
        else if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1
        }
    })
}

const expensesReducerState = []
// Expenses Reducer
const expensesReducer = (state = expensesReducerState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            //concat não modifica o array antigo!
            //es6 spread tmb não modifica o array antigo!
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id)
        
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id){
                    return{
                        ...expense,
                        ...action.updates
                    }
                }
                else{
                    return expense
                }
            })
        default:
            return state
    }
}

const filtersReducerState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}
//Filters Reducer
const filtersReducer = (state = filtersReducerState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return{
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return{
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return{
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return{
                ...state,
                endDate: action.endDate
            }
        default:
            return state
    }
} 

// Store creation
//O combineReducers combina vários reducer em um só, pra facilitar a manipulação dos dados
const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}))

store.subscribe(() => {
    const state = store.getState()
    const VisibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(VisibleExpenses)
})

const expenseOne = store.dispatch(addExpense({
    description: "Wololo",
    amount: 100,
    createdAt: 1000
}))

const expenseTwo = store.dispatch(addExpense({
    description: "pixonga",
    amount: 600,
    createdAt: -1000
}))

// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}))

// //lembrar de colocar o argumento dentro de um objeto!
// store.dispatch(removeExpense({id: expenseOne.expense.id}))


store.dispatch(setTextFilter('pix'))

// store.dispatch(setTextFilter())

// store.dispatch(sortByAmount())

// store.dispatch(sortByDate())

//  store.dispatch(setStartDate(1000))

// store.dispatch(setStartDate())

// store.dispatch(setEndDate(5000))

const demoState = {
    expenses: [{
        id: 'isuadhiuah',
        description: 'Conta do cartão',
        note: 'Tem que pagar einnn?',
        amount: 12000,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date ou amount
        startDate: undefined,
        endDate: undefined 
    }
}