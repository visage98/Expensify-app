import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import Header from '../components/Header';
import ExpenseDashboardPage from '../components/ExpensifyDashboard'
import AddExpensePage from '../components/AddExpense'
import EditExpensePage from '../components/EditExpense'
import NotFoundPage from '../components/NotFoundPage'
import LoginPage from '../components/Login'
import {createBrowserHistory} from 'history';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createBrowserHistory();

const AppRouter = () => (

    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                <PrivateRoute path="/create" component={AddExpensePage} />
                <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>

);

export default AppRouter;