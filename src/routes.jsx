import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// PAGES
import Login from './pages/Login';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
            </Switch>
        </BrowserRouter>
    )
}
export default Routes;