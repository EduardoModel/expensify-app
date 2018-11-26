import React from 'react'
import {connect} from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../actions/filters'

class ExpenseListFilters extends React.Component{
    handleChangeStart = (startDate) => {
        this.props.dispatch(setStartDate(startDate))
    }
    handleChangeEnd = (endDate) => {
        this.props.dispatch(setEndDate(endDate))
    }
    render() {
        return (
            <div>
                <input type="text" value={this.props.filters.text} onChange={(e) => {
                    //quando tu quer mudar o texto do filtro, tu da um
                    //dispatch no valor do filtro através da função
                    props.dispatch(setTextFilter(e.target.value))
                }}/>
                <select
                    value={this.props.filters.sortBy}
                    onChange={(e) => {
                        if(e.target.value === 'date'){
                            this.props.dispatch(sortByDate())
                        }
                        else if(e.target.value === 'amount'){
                            this.props.dispatch(sortByAmount())
                        }
                    }}
                >
                    <option value="date">Data</option>
                    <option value="amount">Valor</option>
                </select>
            <DatePicker
                selected={this.props.filters.startDate}
                selectsStart
                startDate={this.props.filters.startDate}
                endDate={this.props.filters.endDate}
                onChange={this.handleChangeStart}
                dateFormat='dd/MM/yyyy'
                maxDate={this.props.filters.endDate}
                isClearable={true}
            />
            <DatePicker
                selected={this.props.filters.endDate}
                selectsEnd
                startDate={this.props.filters.startDate}
                endDate={this.props.filters.endDate}
                onChange={this.handleChangeEnd}
                dateFormat='dd/MM/yyyy'
                minDate={this.props.filters.startDate}
                isClearable={true}
            />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpenseListFilters)