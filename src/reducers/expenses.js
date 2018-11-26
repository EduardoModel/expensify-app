const expensesReducerState = []
// Expenses Reducer
export default (state = expensesReducerState, action) => {
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
 