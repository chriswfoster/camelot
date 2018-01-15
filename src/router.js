import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import Home from './components/Home/Home'

import store from './store'


export default(
    <Provider store={store}>
    <Switch>
    <Route exact path="/" component={Home}/>
        
        </Switch>
    </Provider>
    )