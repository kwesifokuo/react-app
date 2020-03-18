import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { transitions, positions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { store } from './_helpers';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';

window.store = store;

// optional cofiguration
const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }

render(
    <Provider store={store} template={AlertTemplate} {...options}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
