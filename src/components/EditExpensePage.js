import React from 'react'
import {connect} from 'react-redux'
import ExpenseForm from './ExpenseForm'
import {editExpense, removeExpense} from '../actions/expenses'

const EditExpensePage = (props) => {
    return (
        <div>
            <ExpenseForm 
            expense={props.expense}
            onSubmit={(expense) => {
                console.log(expense)
                props.dispatch(editExpense(props.match.params.id, expense))
                props.history.push('/')
            }}
            />
            <button onClick={() => {
                props.dispatch(removeExpense({id: props.match.params.id}))
                props.history.push('/')
            }}>Remover</button>
        </div>
    )
}

//isso aqui tu faz pra poder passar informação de cima para baixo
const mapStateToProps = (state, props) => {
    return{
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id
        })
    }
}



export default connect(mapStateToProps)(EditExpensePage)
