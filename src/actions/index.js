import * as constants from '../constants/index'


export const findAllWidgets = dispatch => {
    fetch('http://localhost:8080/api/widget')
        .then(response =>
            (response.json())
        )
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets
        }))
};


export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
);

export const save = dispatch => (
    dispatch({type: constants.SAVE})
);

export const preview = dispatch => (
    dispatch({type: constants.PREVIEW})
);
export const headingTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.HEADING_TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
);
export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize
    })
);

export const widgetNameChanged = (dispatch, widgetId, widgetName) => (
    dispatch({
        type: constants.WIDGET_NAME_CHANGED,
        id: widgetId,
        widgetName: widgetName
    })
);

export const paraTextChanged = (dispatch, widgetId, paragraphText) => (
    dispatch({
        type: constants.PARA_TEXT_CHANGED,
        id: widgetId,
        paragraphText: paragraphText
    })
);

export const widgetParaNameChanged = (dispatch, widgetId, widgetNamePara) => (
    dispatch({
        type: constants.WIDGET_PARA_NAME_CHANGED,
        id: widgetId,
        widgetNamePara: widgetNamePara
    })
);

export const listElemChanged = (dispatch, widgetId, listOrder) => (
    dispatch({
        type: constants.LIST_ORDER_CHANGED,
        id: widgetId,
        listSelect: listOrder
    })
);

export const widgetListNameChanged = (dispatch, widgetId, listName) => (
    dispatch({
        type: constants.LIST_NAME_CHANGED,
        id: widgetId,
        widgetNameList: listName
    })
);

export const listTextChanged = (dispatch, widgetId, listText) => (
    dispatch({
        type: constants.LIST_TEXT_CHANGED,
        id: widgetId,
        listText: listText
    })
);
