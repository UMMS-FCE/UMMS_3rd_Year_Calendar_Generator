import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';
import './app.css';

import MainPage from './main_page';

let store = createStore(reducers);

const App = () => (
    <Provider store={ store }>
      <MainPage />
    </Provider>
);

export default App;
