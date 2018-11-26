import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

//OBS.: lembrar que o id é passado como um atributo de um objeto
const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <div>  
    <Link to={'/edit/'+id} >
     <h3>{description}</h3>
    </Link>
    <p>R$: {amount} - Data:{moment(createdAt).format('DD/MM/YYYY')}</p>
    </div>
)

export default ExpenseListItem