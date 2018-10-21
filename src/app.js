import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import getVisibleItems from './selectors/expenses';
import {Provider} from 'react-redux';
import {addExpense, removeExpense, editExpense} from './actions/expenses';
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from './actions/filters'
import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();
// store.subscribe(()=>{
//     console.log(store.getState());
// });
store.dispatch(addExpense({
    description : "Water Bill",
    amount : 100,
    createdAt : 10
}));
store.dispatch(addExpense({
    description : "Rent",
    amount : 104900,
    createdAt : 5
}));
store.dispatch(addExpense({
    description : "Gas Bill",
    amount : 1000,
    createdAt : 20
}));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx , document.getElementById('app'));
