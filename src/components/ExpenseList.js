import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
import ExpenseListFilter from './ExpenseListFilter';

export const ExpenseList = (props) => (
    <div>
        <ExpenseListFilter />
        <h1>Expenses List</h1>
        {props.expenses.map((expense) => {
            return <ExpenseListItem key={expense.id} {...expense} />
        })}
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filter)
    };
};

export default connect(mapStateToProps)(ExpenseList);
