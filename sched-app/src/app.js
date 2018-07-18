import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import {reducers} from './reducers';
import './app.css';

import MainPage from './main_page';

const appReducer = combineReducers({
    main: reducers,
});

let store = createStore(appReducer, {}, applyMiddleware(thunkMiddleware));

const App = () => (
    <Provider store={ store }>
      <MainPage />
    </Provider>
);

export default App;
