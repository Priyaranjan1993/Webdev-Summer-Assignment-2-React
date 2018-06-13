import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CourseManager from './containers/CourseManager';

import {Provider} from 'react-redux'
import {createStore} from 'redux';
import {WidgetReducer} from './reducers/WidgetReducer'

/*import {Provider} from "react-redux";
import {connect} from "react-redux";
import {render} from 'react-dom';
import {createStore} from 'redux';

let initialState = {
    widgets: [
        {id: 0, text: 'Widget 1'},
        {id: 1, text: 'Widget 2'},
        {id: 2, text: 'Widget 3'}
    ]
};

const Widget = ({widget, dispatch}) => (
    <li key={widget.id}>{widget.id}{widget.text}
        <button onClick={e => (
            dispatch({type: 'DELETE WIDGET', id: widget.id})
        )}>Delete
        </button>
    </li>
);

const WidgetContainer = connect()(Widget);

class WidgetList extends Component {
    constructor(props) {
        super(props);
        this.props.findAllWidgets();
    }

    render() {
        return (
            <div>
                <h1>Widgets List {this.props.widgets.length}</h1>
                <ul>
                    {this.props.widgets.map(widget => (<WidgetContainer widget={widget}/>))}
                </ul>
                <button onClick={e => (this.props.dispatch({type: 'ADD WIDGET'}))}>
                    Add Widget
                </button>
            </div>
        )
    }
}

let idAutoIncrement = 3;
const widgetReducer = (state = {widgets:[]}, action) => {
    switch (action.type) {
        case 'ADD WIDGET' :
            //alert('adding a widget');
            return {
                widgets: [
                    ...state.widgets,
                    {id: idAutoIncrement++, text: 'New Widget'}
                ]
            };
        case 'DELETE WIDGET':
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id != action.id
                ))
            };
        case 'FIND_ALL_WIDGETS':
            return {
                widgets: action.widgets
            };
        default:
            return state
    }
};

const findAllWidgets = dispatch => {
    fetch('http://localhost:8080/api/widget')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: 'FIND_ALL_WIDGETS',
            widgets: widgets }))
};

const dispatcherToPropsMapper
    = dispatch => ({
    findAllWidgets: () => findAllWidgets(dispatch),
    addWidget: () => addWidget(dispatch),

});

const stateToPropertiesMapper = (state) => ({
    widgets: state.widgets,
});

let store = createStore(widgetReducer);

const App = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(WidgetList);

render(<Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));*/

let store = createStore(WidgetReducer);

ReactDOM.render(
    <Provider store={store}>
        <CourseManager/>
    </Provider>,
    document.getElementById('root')
);
