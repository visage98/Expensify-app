import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

class ExpenseListFilter extends React.Component {
    state = {
        calenderFocused : null
    }
    onDatesChange=({startDate,endDate})=>{
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }
    onFocusChange=()=>{
        this.setState((calenderFocused)=>{
            calenderFocused
        });
    }
    render() {
        return (
            <div>
                <input type="text" value={this.props.filter.text} onChange={(e) => {
                    this.props.dispatch(setTextFilter(e.target.value));
                }} />
                <select value={this.props.filter.sortBy} onChange={(e) => {
                    if (e.target.value === 'amount')
                        this.props.dispatch(sortByAmount());
                    if (e.target.value === 'date')
                        this.props.dispatch(sortByDate());
                }}>
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

export default connect(mapStateToProps)(ExpenseListFilter);