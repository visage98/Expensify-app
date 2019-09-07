import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {startSetExpenses} from './actions/expenses'
import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '../firebase/firebase';

const store = configureStore();

console.log("test");
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<p>Loading...</p> , document.getElementById('app'));

store.dispatch(startSetExpenses()).then(()=>{
    ReactDOM.render(jsx , document.getElementById('app'));
});