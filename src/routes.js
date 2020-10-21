import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Begin from './pages/Begin';
import Select from './pages/Select';
import Compare from './pages/Compare';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Begin} />
                <Route path="/select" component={Select} />
                <Route path="/compare" component={Compare} />
            </Switch>
        </BrowserRouter>
    );
}