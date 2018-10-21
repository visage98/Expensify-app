import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = ({
    description = "",
    note = "",
    amount = 0,
    createdAt = 0
} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ({ id }) => ({
    type: "REMOVE_EXPENSE",
    id
});

const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});

const expenseReducerDefaultState = [];
const expenseReducer = (state = expenseReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id != action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id == action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            })
        default:
            return state;
    }
};

const setTextFilter = (text = "") => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const setStartDate = (startDate = undefined) => ({
    type: 'SET_STARTDATE',
    startDate
});

const setEndDate = (endDate = undefined) => ({
    type: 'SET_ENDDATE',
    endDate
});

const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}
const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SET_STARTDATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_ENDDATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate !== 'number' || startDate<=expense.createdAt;
        const endDateMatch = typeof endDate !== 'number' || endDate>=expense.createdAt;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch&&endDateMatch&&textMatch;
    }).sort((a, b)=>{
        if(sortBy==='date'){
            return a.createdAt - b.createdAt;
        } else if(sortBy==='amount'){
            return a.amount-b.amount;
        } else {
            return 0;
        }
    });
}

const store = createStore(
    combineReducers({
        expenses: expenseReducer,
        filter: filterReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filter);
    console.log(visibleExpenses);
});

const expenseNumberOne = store.dispatch(addExpense({
    description: "Rent",
    amount: 300,
    createdAt : -10
}));

const expenseNumberTwo = store.dispatch(addExpense({
    description: "Coffee",
    amount : 100,
    createdAt : 10
}));

// store.dispatch(removeExpense({ id: expenseNumberTwo.expense.id }));
// store.dispatch(editExpense(expenseNumberOne.expense.id, { amount: 200 }));
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
store.dispatch(sortByDate());
store.dispatch(sortByAmount());
// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(0));
// store.dispatch(setEndDate());


const demoState = {
    expenses: [{
        id: 'poijasdfhwer',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};

