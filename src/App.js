import React, {Component} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import FieldBuilder from './Components/FieldBuilder'
import MockService from './Services/MockService'
import {BrowserRouter as Router, Route} from 'react-router-dom'

let mockService =
    MockService.getInstance();

class App extends React.Component {


    render() {
        return (
            <Router>
                <Route
                    exact path="/"
                    render={() => <FieldBuilder data={mockService.getData()}/>}/>
            </Router>
        );
    }
}

export default App;
