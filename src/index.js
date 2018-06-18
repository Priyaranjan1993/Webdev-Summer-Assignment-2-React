import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CourseManager from './containers/CourseManager';

import {Provider} from 'react-redux'
import {createStore} from 'redux';
import {WidgetReducer} from './reducers/WidgetReducer'

let store = createStore(WidgetReducer);

ReactDOM.render(
    <Provider store={store}>
        <CourseManager/>
    </Provider>,
    document.getElementById('root')
);
