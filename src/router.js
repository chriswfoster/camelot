import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import Home from './components/Home/Home'

import ViewPlayerInv from './components/ViewPlayerInv/ViewPlayerInv.js'
import LoginSignup from './components/LoginSignup/LoginSignup'
import YourNode from './components/YourNode/YourNode'
import ModelViewer from './components/ModelViewer/ModelViewer'
import AccountTool from './components/AccountTool/AccountTool'
import store from './store'


export default(
    <Provider store={store}>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/viewplayersinv" component={ViewPlayerInv} />
    <Route path="/accounttool" component={AccountTool} />
    <Route path="/loginsignup" component={LoginSignup} />
    <Route path="/yournode" component={YourNode} />
    <Route path="/modelviewer" component={ModelViewer} />
        
        </Switch>
    </Provider>
    )