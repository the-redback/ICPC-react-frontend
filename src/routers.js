import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
// import { ContestPage } from './components/ContestPage';
import TeamPage from "./components/TeamPage";
import ContestPage from "./components/ContestPage";
import Home from "./components/Home";

export default function RouterConfig() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" key={1} component={Home}/>
                <Route exact path="/creation" key={2} component={TeamPage} />
                <Route exact path="/contest" key={3} component={ContestPage} />
            </Switch>
        </BrowserRouter>
    );
} 
