import * as constants from "../constants/index"
import $ from 'jquery'

export const WidgetReducer = (state = {
    widgets: [],
    preview: false,
    orderNumber: 0,
    orderArray: [],
    downButton : true
}, action) => {
    let newState;
    var orderNumber;
    var paragraphArray = [];

    switch (action.type) {
        case constants.FIND_ALL_WIDGETS :
            newState = Object.assign({}, state);
            newState.widgets = action.widgets;
            newState.orderNumber = action.widgets.length;
            newState.orderArray = [];
            //newState.listTextToArray = state.listTextToArray;
            console.log(newState);
            return newState;

        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget =>
                    (
                        widget.id != action.id
                    )), orderNumber: state.orderNumber
            };

        case constants.ADD_WIDGET:
            state.orderNumber++;
            var uid =  Math.floor(1000 + Math.random() * 9000);
            return {
                widgets: [
                    ...state.widgets,
                    {
                        id: uid,
                        text: 'New Widget',
                        widgetType: 'Heading',
                        size: '1',
                        widgetName:'Widget Name',
                        paragraphText:'',
                        widgetNamePara:'Widget Name',
                        listSelect:'1',
                        widgetNameList:'Widget Name',
                        listText:'',
                        listTextToArray:[],
                        searchName:'',
                        src:'',
                        imageArray:[],
                        widgetNameImage:'Widget Name',
                        linkText:'',
                        linkUrl:'',
                        linkName:'Widget Name',
                        orderNum: state.orderNumber
                    }
                ], orderNumber: state.orderNumber,
                orderArray: state.orderArray
            };

        case constants.SAVE:
            let lessonId = action.lessonId;
            fetch('http://localhost:8080/api/lesson/lessonId/widget'.replace('lessonId',lessonId),{
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
                }), orderNumber: state.orderNumber,
                orderArray: state.orderArray
            };
            return JSON.parse(JSON.stringify(newState));

        case constants.HEADING_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray
            };

        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray
            };

        case constants.WIDGET_NAME_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.widgetName = action.widgetName
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray
            };

        case constants.MOVE_DOWN:
            let index;
            state.orderArray = [];
            state.widgets.map(widget => {
                state.orderArray.push(widget.orderNum);
            });
            state.orderArray.sort();
            index = state.orderArray.indexOf(action.widget.orderNum);
            return {
                widgets: state.widgets.map(widget => {
                    if(index != state.orderArray.length -1)
                    {
                        if (widget.orderNum === state.orderArray[index]) {
                            widget.orderNum = state.orderArray[index+1];
                        }
                        else if (widget.orderNum === state.orderArray[index + 1]) {
                            widget.orderNum = state.orderArray[index];
                        }
                    }
                    else{
                        state.downButton = false;
                    }

                    console.log(widget);
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray,
                downButton : state.downButton
            };

        case constants.MOVE_UP:
            let arrayIndex;
            state.orderArray = [];
            state.widgets.map(widget => {
                state.orderArray.push(widget.orderNum);
            });
            state.orderArray.sort();
            arrayIndex = state.orderArray.indexOf(action.widget.orderNum);
            return {
                widgets: state.widgets.map(widget => {
                    if(arrayIndex != 0)
                    {
                        if (widget.orderNum === state.orderArray[arrayIndex]) {
                            widget.orderNum = state.orderArray[arrayIndex-1];
                        }
                        else if (widget.orderNum === state.orderArray[arrayIndex-1]) {
                            widget.orderNum = state.orderArray[arrayIndex];
                        }
                    }
                    else{
                        state.downButton = false;
                    }

                    console.log(widget);
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray,
                downButton : state.downButton
            };

        case constants.PREVIEW:
            return {
                widgets: state.widgets,
                preview: !state.preview,
                orderNumber: state.orderNumber
            };

        case constants.PARA_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.paragraphText = action.paragraphText
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray
            };

        case constants.WIDGET_PARA_NAME_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.widgetNamePara = action.widgetNamePara
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray
            };

        case constants.LIST_ORDER_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.listSelect = action.listSelect
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray
            };

        case constants.LIST_NAME_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.widgetNameList = action.widgetNameList
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray
            };

        case constants.LIST_TEXT_CHANGED:
            paragraphArray =[];
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.listText = action.listText;
                        paragraphArray = widget.listText.split('\n');
                        console.log(paragraphArray);
                        widget.listTextToArray = paragraphArray;
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray
            };

        case constants.SEARCH_NAME_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.searchName = action.searchName;
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray
            };

        case constants.SEARCH_NAME_RENDER:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.imageArray = action.imageResults;
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray
            };

        case constants.ASSIGN_URL:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.src = action.selectedImageUrl;
                        widget.imageArray = [];
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray
            };
        case constants.WIDGET_NAME_IMAGE_CHANGED:
            return{
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.widgetNameImage = action.widgetNameImage;
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray
            };
        case constants.WIDGET_IMAGE_SRC_CHANGED:
            return{
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.src = action.src;
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray
            };

        case constants.LINK_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.linkText = action.linkText;
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray
            };

        case constants.LINK_URL_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.linkUrl = action.linkUrl;
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray
            };

        case constants.WIDGET_NAME_LINK_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.linkName = action.linkName;
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray : state.orderArray
            };
        default:
            return state;
    }

};