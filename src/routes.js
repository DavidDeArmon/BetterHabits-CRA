import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard'
import MoodDash from './components/MoodDash';

export default(
    <Switch>
        <Route exact path = '/' component = {Dashboard}/>
        <Route path= '/moods' component={MoodDash}/>
    </Switch>
)