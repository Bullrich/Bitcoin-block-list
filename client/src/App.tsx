import React from 'react';
import './App.css';
import BlockList from "./blockList/blockList";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {Container} from "@material-ui/core";
import NavBar from "./components/navBar";
import BlockDetail from "./blockList/BlockDetail";


function App() {
    return (
        <div className="App">
            <NavBar/>
            <Container>
                <Router>
                    <Switch>
                        <Route exact path="/:hash" render={props =>
                            <BlockDetail {...props} />}
                        />

                        <Route path="/" component={BlockList}/>
                    </Switch>
                </Router>
            </Container>
        </div>
    );
}

export default App;
