import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

export class ExpenseListFilter extends React.Component {
    state = {
        calenderFocused : null
    }
    onDatesChange=({startDate,endDate})=>{
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }
    onFocusChange=()=>{
        this.setState((calenderFocused)=>{
            calenderFocused
        });
    }
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    }
    onSortChange = (e) => {
        if (e.target.value === 'amount')
            this.props.sortByAmount();
        if (e.target.value === 'date')
            this.props.sortByDate();
    }
    render() {
        return (
            <div>
                <input type="text" value={this.props.filter.text} onChange={this.onTextChange} />
                <select value={this.props.filter.sortBy} onChange={this.onSortChange}>
                    <option value='date'>Date</option>
                    <option value='amount'>Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filter.startDate}
                    startDateId={moment(this.props.filter.startDate).toString()}
                    endDate={this.props.filter.endDate}
                    endDateId={moment(this.props.filter.endDate).toString()}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calenderFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    showClearDates={true}
                    isOutsideRange={()=>false}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTextFilter : (text) => {dispatch(setTextFilter(text))},
        sortByDate : ()=>{dispatch(sortByDate())},
        sortByAmount : ()=>{dispatch(sortByAmount())},
        setStartDate : (startDate)=>{dispatch(setStartDate(startDate))},
        setEndDate : (endDate)=>{dispatch(setEndDate(endDate))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilter);