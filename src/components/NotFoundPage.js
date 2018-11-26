import React from 'react'
import {Link} from 'react-router-dom'

//O link te redireciona pra uma página no lado do cliente, 
//não precisando recarregar a página!
const NotFoundPage = () => (
    <div>
        404! - <Link to='/'>Vá para a página inicial</Link>
    </div>
) 

export default NotFoundPage