import * as constants from '../constants/index'
import $ from "jquery";


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

export const searchNameChanged = (dispatch, widgetId, searchName) => (
    dispatch({
        type: constants.SEARCH_NAME_CHANGED,
        id: widgetId,
        searchName: searchName
    })
);

export const searchNameRender = (dispatch, widgetId, searchName) => (
/*    dispatch({
        type: constants.SEARCH_NAME_RENDER,
        id: widgetId,
        searchName: searchName
    })*/
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "https://www.googleapis.com/customsearch/v1",
        data: {
            key: "AIzaSyCf9F4hKshY8PBNnGGunkGcu6Ip3dvaeU4",
            cx: "004286675445984025592:ypgpkv9fjd4",
            filter: "1",
            searchType: "image",
            start:1,
            q: searchName
        }
    }).done(function(data) {
        console.log(data);
        var googleResults = data.items;
        console.log(googleResults);
    }).
        done(googleResults => dispatch({
        type: constants.SEARCH_NAME_RENDER,
        id: widgetId,
        imageResults: googleResults
}))
);


export const widgetImageSrcChanged = (dispatch, widgetId, imageSrc) => (
    dispatch({
        type: constants.WIDGET_IMAGE_SRC_CHANGED,
        id: widgetId,
        src: imageSrc
    })
);

export const widgetNameImageChanged = (dispatch, widgetId, imageWidgetName) => (
    dispatch({
        type: constants.WIDGET_NAME_IMAGE_CHANGED,
        id: widgetId,
        widgetNameImage: imageWidgetName
    })
);

export const assignUrl = (dispatch, widgetId, imageUrl) => (
    dispatch({
        type: constants.ASSIGN_URL,
        id: widgetId,
        selectedImageUrl: imageUrl
    })
);
