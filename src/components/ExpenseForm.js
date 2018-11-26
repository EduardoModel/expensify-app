import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

class ExpenseForm extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            description: props.expense? props.expense.description : '',
            note: props.expense? props.expense.note : '',
            amount: props.expense? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense? new Date(props.expense.createdAt) : new Date(),
            error: ''
        }
    }
    
    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({ description }))
    }
    onAmountChange = (e) => {
        const amount = e.target.value
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(() => ({ amount }))
        }
    }
    onDateChange = (createdAt) => {
        if(createdAt){
            this.setState(() => ({ createdAt }))
        }
    }
    onNoteChange = (e) => {
        const note = e.target.value
        this.setState(() => ({ note }))
    }
    onSubmit = (e) => {
        e.preventDefault()
        if(!this.state.description || !this.state.amount){
            this.setState(() => ({
                error: 'Por favor, entre com uma descrição e uma quantidade'
            }))
        }else{
            this.setState(() => ({
                error: ''
            }))
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="Descrição"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="text"
                        placeholder="Quantidade"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <DatePicker 
                        selected={this.state.createdAt}
                        onChange={this.onDateChange}
                        dateFormat='dd/MM/yyyy'
                    />
                    <textarea 
                        placeholder="Adicionar uma nota para sua dispesa (opcional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >      
                    </textarea>
                    
                    <button>Adicionar Despesa</button>
                </form>
            </div>
        )
    }
}

export default ExpenseForm