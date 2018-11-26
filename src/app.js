import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
//os reducers são inclusos no configureStore, aí é só mandar as acções
import configureStore from './store/configureStore'
import {addExpense} from './actions/expenses'
import {setTextFilter, sortByAmount} from './actions/filters'
import getVisibleExpenses from './selectors/expenses'
import './styles/styles.scss'
//o provider fornece o store (redux) para a aplicação através 
//basicamente liga o armazenamento do redux com qq componente e usa HOC
//(High Order Components)
import {Provider} from 'react-redux'
import AppRouter from './routers/AppRouter'

const store = configureStore()

store.dispatch(addExpense({
    description: 'Water Bill',
    amount: 10000,
    createdAt: 500000000
}))

store.dispatch(addExpense({
    description: 'Gas Bill',
    amount: 8000
}))

store.dispatch(addExpense({
    description: 'Rent',
    amount: 80,
    createdAt: 1000
}))

const state = store.getState()

const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)

console.log(visibleExpenses)

console.log(store.getState())

const jsx = (
    //atribui o store do redux ao provider, que este vai fornecer acesso
    //para todos os demais componentes
    <Provider store={store}>
        <AppRouter />
    </Provider>
    
) 


ReactDOM.render(jsx, document.getElementById('app'))