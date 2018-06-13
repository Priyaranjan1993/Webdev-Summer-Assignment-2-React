import * as constants from "../constants/index"

export const WidgetReducer = (state = {
    widgets: [],
    preview : false
}, action) => {
    let newState;

    switch (action.type) {
        case constants.FIND_ALL_WIDGETS :
            newState = Object.assign({}, state);
            newState.widgets = action.widgets;
            console.log(newState);
            return newState;
        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget =>
                    (
                        widget.id != action.id
                    ))
            };
        case constants.ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {
                        id: state.widgets.length + 1,
                        text: 'New Widget',
                        widgetType: 'Heading',
                        size: '1'
                    }
                ]
            };
        case constants.SAVE:
            fetch('http://localhost:8080/api/widget/save', {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            });
            return state;
        case constants.SELECT_WIDGET_TYPE:
            console.log(action);
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if (widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })
            };
            return JSON.parse(JSON.stringify(newState));
        case constants.HEADING_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            };
        case constants.PREVIEW:
            return {
                widgets: state.widgets,
                preview: !state.preview
            };
        default:
            return state;
    }

};