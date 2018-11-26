import React from 'react'
import ExpenseListItem from './ExpenseListItem'
import {connect} from 'react-redux'
import selectExpenses from '../selectors/expenses'

//usar o spread operator pra passar os todos os valores de expense
const ExpenseList = (props) => (
    <div>
        <h1>Lista de dispesas</h1>
        {props.expenses.map((expense) => {
            return <ExpenseListItem key={expense.id} {...expense}/>
        })}
    </div>
)

//o que a gente quer pegar do store (redux) e fornecer a um componente
const mapStateToProps = (state) => {
    return {
        //aqui tu passa o retorno da chamada de função selectExpenses
        //pra aplicar os filtros desejados e pá
        expenses: selectExpenses(state.expenses, state.filters)
    }
}
//High Order Component é uma função que pega um componente e retorna um novo componente
//basicamente é um componente (HOC) que renderiza outro componente

//quando tu atrela um componente com o redux (store) quando qq valor mudar
//ele automaticamente vai atualizar, tirando a parte de ter que ficar consultando atualizações do estado

//basicamente conecta o que tu quer do data base com o componente
export default connect(mapStateToProps)(ExpenseList)