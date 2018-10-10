import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard'
import MoodDash from './components/MoodDash';
import HabitDash from './components/HabitDash';

export default(
    <Switch>
        <Route exact path = '/' component = {Dashboard}/>
        <Route path= '/moods' component={MoodDash}/>
        <Route path= '/habits' component={HabitDash}/>
    </Switch>
)