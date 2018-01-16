import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import Home from './components/Home/Home'
import ViewPlayerInv from './components/ViewPlayerInv/ViewPlayerInv.js'

import store from './store'


export default(
    <Provider store={store}>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/viewplayersinv" component={ViewPlayerInv} />
        
        </Switch>
    </Provider>
    )