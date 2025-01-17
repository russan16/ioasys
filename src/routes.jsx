import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import isAuthenticated from './auth';
// PAGES
import Login from './pages/Login';
import Home from './pages/Home';
import Interna from './pages/Interna';

const PrivateLogin = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => !isAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{pathname: "/home"}}/>
        )}
    />
);

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => isAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{pathname: "/"}}/>
        )}
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <PrivateLogin path="/" exact component={Login}/>
            <PrivateRoute path="/home" component={Home}/>
            <PrivateRoute path="/interna/:id" component={Interna}/>
        </Switch>
    </BrowserRouter>
)
export default Routes;