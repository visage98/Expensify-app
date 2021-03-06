import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : "",
            note: props.expense ? props.expense.note : "",
            amount: props.expense ? (props.expense.amount / 100).toString() : "",
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onDateChange = (createdAt) => {
        if (createdAt)
            this.setState(() => ({ createdAt }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (amount.match(/^(\d+(\.\d{0,2})?)?$/)) {
            this.setState(() => ({ amount }))
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please provide description and amount.' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                description: this.state.description,
                note: this.state.note,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf()
            })
        }
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} className="form">
                {this.state.error.length > 0 && <p className="form__error">{this.state.error}</p>}
                <input type='text' placeholder="Description" className="text-input" value={this.state.description} onChange={this.onDescriptionChange} placeholder="Description" />
                <input type='text' placeholder="Amount" className="text-input" value={this.state.amount} onChange={this.onAmountChange} placeholder="Amount" />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={({ focused }) => { this.setState(() => ({ calendarFocused: focused })) }}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea className="textarea" type='text' value={this.state.note} onChange={this.onNoteChange} placeholder="Note (Optional)" />
                <div>
                    <button className="button" type='submit'>Save Expense</button>
                </div>
            </form>
        )
    }
}