import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
// PAGES
import Login from './pages/Login';
import Home from './pages/Home';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => isAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{pathname: "/", state: {from: props.location}}}/>
        )}
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login}/>
            <PrivateRoute path="/home" component={Home}/>
        </Switch>
    </BrowserRouter>
)
export default Routes;