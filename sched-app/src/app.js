import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import {reducers} from './reducers';
import './app.css';

import MainPage from './main_page';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.appReducer = combineReducers({
            main: reducers(props.constants), });
        this.store = createStore(this.appReducer, {},
                                 applyMiddleware(thunkMiddleware));
    }

    render(){
        return (
            <Provider store={ this.store }>
              <MainPage />
            </Provider>
        );
    }
}

export default App;
