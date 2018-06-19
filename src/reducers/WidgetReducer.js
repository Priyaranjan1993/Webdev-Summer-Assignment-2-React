import * as constants from "../constants/index"
import $ from 'jquery'

function successFn(str) {
    console.log(str);
   if(str[0] === "error"||str[0] === null)
    {
        var x1 = document.getElementById("error");
        x1.className = "show";
        setTimeout(function(){ x1.className = x1.className.replace("show", ""); }, 6000);
    }
    else{
       var x2 = document.getElementById("success");
       x2.className = "show";
       setTimeout(function(){ x2.className = x2.className.replace("show", ""); }, 3000);
    }

}

export const WidgetReducer = (state = {
    widgets: [],
    preview: false,
    orderNumber: 0,
    orderArray: [],
    downButton: true
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
            var uid = Math.floor(1000 + Math.random() * 9000);
            let newStates = {
                widgets: [
                    ...state.widgets.map(widget => {
                            widget.innerPreview = 'true';
                            return Object.assign({}, widget);
                        }
                    ),
                    {
                        id: uid,
                        text: 'New Widget',
                        widgetType: 'Heading',
                        size: '1',
                        widgetName: 'Widget Name',
                        paragraphText: '',
                        widgetNamePara: 'Widget Name',
                        listSelect: '1',
                        widgetNameList: 'Widget Name',
                        listText: '',
                        listTextToArray: [],
                        searchName: '',
                        src: '',
                        imageArray: [],
                        widgetNameImage: 'Widget Name',
                        linkText: '',
                        linkUrl: '',
                        linkName: 'Widget Name',
                        innerPreview: 'false',
                        orderNum: state.orderNumber
                    }
                ], orderNumber: state.orderNumber,
                orderArray: state.orderArray
            };
            return newStates;

        case constants.SAVE:
            let lessonId = action.lessonId;
            fetch('https://shrouded-lowlands-37542.herokuapp.com/api/lesson/lessonId/widget'.replace('lessonId', lessonId), {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response =>
                (response.json())
            ).then(successFn);
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
                orderArray: state.orderArray
            };

        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray: state.orderArray
            };

        case constants.WIDGET_NAME_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.widgetName = action.widgetName
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray: state.orderArray
            };

        case constants.MOVE_DOWN:
            let index;
            state.orderArray = [];
            state.widgets.map(widget => {
                state.orderArray.push(widget.orderNum);
            });
            state.orderArray.sort();
            index = state.orderArray.indexOf(action.widget.orderNum);

            var x6 = document.getElementById("reposition");
            x6.className = "show";
            setTimeout(function(){ x6.className = x6.className.replace("show", ""); }, 2000);

            if (index === state.orderArray.length - 1) {
                var x5 = document.getElementById("bottom");
                x5.className = "show";
                setTimeout(function(){ x5.className = x5.className.replace("show", ""); }, 4000);
            }
            return {
                widgets: state.widgets.map(widget => {
                    if (index != state.orderArray.length - 1) {
                        if (widget.orderNum === state.orderArray[index]) {
                            widget.orderNum = state.orderArray[index + 1];
                        }
                        else if (widget.orderNum === state.orderArray[index + 1]) {
                            widget.orderNum = state.orderArray[index];
                        }
                    }
                    else {
                        //state.downButton = false;
                        //widget.arrowDown = false;
                        //alert("Already at Bottom");
                    }

                    console.log(widget);
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray: state.orderArray,
                downButton: state.downButton
            };

        case constants.MOVE_UP:
            let arrayIndex;
            state.orderArray = [];
            state.widgets.map(widget => {
                state.orderArray.push(widget.orderNum);
            });
            state.orderArray.sort();

            var x7 = document.getElementById("reposition");
            x7.className = "show";
            setTimeout(function(){ x7.className = x7.className.replace("show", ""); }, 2000);

            arrayIndex = state.orderArray.indexOf(action.widget.orderNum);
            if (arrayIndex === 0) {
                //alert("Already at Top");
                var x4 = document.getElementById("top");
                x4.className = "show";
                setTimeout(function(){ x4.className = x4.className.replace("show", ""); }, 4000);
            }
            return {
                widgets: state.widgets.map(widget => {
                    if (arrayIndex != 0) {
                        if (widget.orderNum === state.orderArray[arrayIndex]) {
                            widget.orderNum = state.orderArray[arrayIndex - 1];
                        }
                        else if (widget.orderNum === state.orderArray[arrayIndex - 1]) {
                            widget.orderNum = state.orderArray[arrayIndex];
                        }
                    }
                    else {
                        //state.downButton = false;
                        //widget.arrowUp = false;
                        //alert("Already at Top");
                    }

                    console.log(widget);
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray: state.orderArray,
                downButton: state.downButton
            };

        case constants.EDIT_WIDGET:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.widget.id) {
                        widget.innerPreview = 'false';
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray: state.orderArray
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
                orderArray: state.orderArray
            };

        case constants.WIDGET_PARA_NAME_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.widgetNamePara = action.widgetNamePara
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray: state.orderArray
            };

        case constants.LIST_ORDER_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.listSelect = action.listSelect
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray: state.orderArray
            };

        case constants.LIST_NAME_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.widgetNameList = action.widgetNameList
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray: state.orderArray
            };

        case constants.LIST_TEXT_CHANGED:
            paragraphArray = [];
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
                orderArray: state.orderArray
            };

        case constants.SEARCH_NAME_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.searchName = action.searchName;
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray: state.orderArray
            };

        case constants.SEARCH_NAME_RENDER:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.imageArray = action.imageResults;
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray: state.orderArray
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
                orderArray: state.orderArray
            };
        case constants.WIDGET_NAME_IMAGE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.widgetNameImage = action.widgetNameImage;
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray: state.orderArray
            };
        case constants.WIDGET_IMAGE_SRC_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.src = action.src;
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray: state.orderArray
            };

        case constants.LINK_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.linkText = action.linkText;
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray: state.orderArray
            };

        case constants.LINK_URL_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.linkUrl = action.linkUrl;
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray: state.orderArray
            };

        case constants.WIDGET_NAME_LINK_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.linkName = action.linkName;
                    }
                    return Object.assign({}, widget)
                }), orderNumber: state.orderNumber,
                orderArray: state.orderArray
            };
        default:
            return state;
    }

};