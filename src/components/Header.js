import React from 'react'
import {NavLink} from 'react-router-dom'


//O NavLink é mais voltado para a navegação e permite estilizar
const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to='/' activeClassName="is-active" exact={true} >Dashboard</NavLink>
        <NavLink to='/create' activeClassName="is-active" >Criar dispesa</NavLink>
        <NavLink to='/help' activeClassName="is-active" >Ajuda</NavLink>
    </header>
)

export default Header