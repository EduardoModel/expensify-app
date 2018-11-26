import {createStore} from 'redux'

//Action generators - funções que retornam action objects
// a vantagem é a detecção de erros
//tem que definir o payload tem que ser definido como um obj default
//a desconstrução é bom pra não ter que ficar acessando as propriedades do objeto
const incrementCout = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const setCount = ({count} = {}) => ({
    type: 'SET',
    count
})

const resetCount = () => ({
    type: 'RESET',
    count: 0
})

//Propriedades do reducer:
//1. Reducers são funções puras, significa que a saída depende exclusivamente das entradas e nada de fora, como variáveis globais
//2. Nunca muda o estado e as açoes

//gera o local de armazenamento do redux
//tu seta tmb o estado padrão do objeto no argumento da função
//reducer tem como objetivo atualizar o estado da aplicação
const countReducer = ((state = {count: 0}, action) => {
    switch(action.type){
        case 'INCREMENT':
            return{
                count: state.count + action.incrementBy
            }
        
        case 'DECREMENT':
            return{
                count: state.count - action.decrementBy
            }
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return{
                count: 0
            }
        default:
            return state
    }
})

const store = createStore(countReducer)

console.log(store.getState())

store.dispatch(incrementCout())
//tem que fornecer o objeto
store.dispatch(setCount({count: -122}))

console.log(store.getState())

store.dispatch(incrementCout({ incrementBy: 5}))


console.log(store.getState())