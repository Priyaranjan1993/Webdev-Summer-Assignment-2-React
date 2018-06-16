import React from 'react'
import {DELETE_WIDGET} from "../constants/index"
import * as actions from '../actions'
import {connect} from 'react-redux'
import $ from 'jquery'
import '../css/WidgetList.style.client.css'
import * as constants from "../constants";


const Heading = ({widget, preview, headingTextChanged, headingSizeChanged, widgetNameChanged}) => {
    let selectElem;
    let inputElem;
    let inputWidgetName;
    return (
        <div>
            <div hidden={preview}>
                {/*<h2> Heading {widget.size}</h2>*/}
                <input onChange={() => headingTextChanged(widget.id, inputElem.value)}
                       value={widget.text}
                       ref={node => inputElem = node}/>
                <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                        value={widget.size}
                        ref={node => selectElem = node}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
                <input value={widget.widgetName}
                       onChange={() => widgetNameChanged(widget.id, inputWidgetName.value)}
                       ref={node => inputWidgetName = node}/>
                <h3>Preview</h3>
            </div>
            {widget.size == 1 && <h1>{widget.text}</h1>}
            {widget.size == 2 && <h2>{widget.text}</h2>}
            {widget.size == 3 && <h3>{widget.text}</h3>}
        </div>
    )
};


const dispatchToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId, newText) =>
        actions.headingTextChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) =>
        actions.headingSizeChanged(dispatch, widgetId, newSize),
    widgetNameChanged: (widgetId, newName) =>
        actions.widgetNameChanged(dispatch, widgetId, newName)
});


const stateToPropsMapper = state => ({
    preview: state.preview
});
const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading);

const Paragraph = ({widget, preview, paraTextChanged, widgetParaNameChanged}) => {
    let paraWidgetName;
    let paraWidgetVal;
    return (
        <div>
            <div>
                <h2>Paragraph</h2>
                <textarea value={widget.paragraphText}
                          onChange={() => paraTextChanged(widget.id, paraWidgetVal.value)}
                          ref={node => paraWidgetVal = node}/>
                <input value={widget.widgetNamePara}
                       onChange={() => widgetParaNameChanged(widget.id, paraWidgetName.value)}
                       ref={node => paraWidgetName = node}/>
            </div>
            <h3>Preview</h3>
            {widget.paragraphText}
        </div>
    )
};

const dispatchToPropsMapperPara = dispatch => ({
    paraTextChanged: (widgetId, paraText) =>
        actions.paraTextChanged(dispatch, widgetId, paraText),
    widgetParaNameChanged: (widgetId, paraName) =>
        actions.widgetParaNameChanged(dispatch, widgetId, paraName)
});

const stateToPropsMapperPara = state => ({
    preview: state.preview
});

const ParagraphContainer = connect(stateToPropsMapperPara, dispatchToPropsMapperPara)(Paragraph);


const List = ({widget,preview,listElemChanged,widgetListNameChanged,listTextChanged}) => {
    let listSelectElem;
    let listWidgetName;
    let listText;
    return (
        <div>
            <div>
                <h2>List</h2>
                <textarea value={widget.listText}
                          onChange={() => listTextChanged(widget.id, listText.value)}
                          ref={node => listText = node}/>
                <select onChange={() => listElemChanged(widget.id, listSelectElem.value)}
                        value={widget.listSelect}
                        ref={node => listSelectElem = node}>
                    <option value="1">Unordered List</option>
                    <option value="2">Ordered List</option>
                </select>
                <input value={widget.widgetNameList}
                       onChange={() => widgetListNameChanged(widget.id, listWidgetName.value)}
                       ref={node => listWidgetName = node}/>
            </div>
            <h3>Preview</h3>
            {widget.listSelect == 1 && <ul>
                {widget.listTextToArray.map((x) =>(
                    <li>{x}</li>
                ))}
            </ul>}

            {widget.listSelect == 2 && <ol>
                {widget.listTextToArray.map((x) =>(
                    <li>{x}</li>
                ))}
            </ol>}
        </div>
    )
};

const dispatchToPropsMapperList = dispatch => ({
    listElemChanged: (widgetId, listOrder) =>
        actions.listElemChanged(dispatch, widgetId, listOrder),
    widgetListNameChanged: (widgetId, listName) =>
        actions.widgetListNameChanged(dispatch, widgetId, listName),
    listTextChanged: (widgetId, listText) =>
        actions.listTextChanged(dispatch, widgetId, listText)
});

const stateToPropsMapperList = state => ({
    preview: state.preview
});

const ListContainer = connect(stateToPropsMapperList, dispatchToPropsMapperList)(List);


const Image = ({widget,preview,assignUrl,searchNameChanged,searchNameRender,widgetImageSrcChanged,widgetNameImageChanged}) => {
    let name;
    let imageUrl;
    let imageWidgetName;
    <h2>Image</h2>
    return (
        <div>
            <div>
                <h2>Image</h2>
                <input value={widget.searchName}
                       onChange={() => searchNameChanged(widget.id, name.value)}
                       ref={node => name = node}/>
                <button onClick={() => searchNameRender(widget.id, name.value)}>Search</button>
                <input value={widget.src}
                       onChange={() => widgetImageSrcChanged(widget.id, imageUrl.value)}
                       ref={node => imageUrl = node}/>
                <input value={widget.widgetNameImage}
                       onChange={() => widgetNameImageChanged(widget.id, imageWidgetName.value)}
                       ref={node => imageWidgetName = node}/>
            </div>
            <h3>Preview</h3>
            {/*<image src={widget.src} alt={widget.searchName}/>*/}
            {widget.imageArray.items != undefined && <div>
                {widget.imageArray.items.map((x) =>(
                       <img src={x.image.thumbnailLink} alt={widget.searchName}
                            onClick={() => assignUrl(widget.id, x.image.thumbnailLink)}/>
                ))}
            </div>}
        </div>
    )
};

const dispatchToPropsMapperImage = dispatch => ({
    searchNameChanged: (widgetId, searchName) =>
        actions.searchNameChanged(dispatch, widgetId, searchName),
    searchNameRender: (widgetId, searchName) =>
        actions.searchNameRender(dispatch, widgetId, searchName),
    widgetImageSrcChanged: (widgetId, imageSrc) =>
        actions.widgetImageSrcChanged(dispatch, widgetId, imageSrc),
    widgetNameImageChanged: (widgetId, imageWidgetName) =>
        actions.widgetNameImageChanged(dispatch, widgetId, imageWidgetName),
    assignUrl: (widgetId, imageUrl) =>
        actions.assignUrl(dispatch, widgetId, imageUrl)

});

const stateToPropsMapperImage = state => ({
    preview: state.preview
});

const ImageContainer = connect(stateToPropsMapperImage, dispatchToPropsMapperImage)(Image);


const Widget = ({widget, preview, orderNoum, allWidgets, dispatch, downButton}) => {
    let selectElement;

    return (
        <li key={widget.id} or={orderNoum} className="widget-li-container">
            {widget.orderNum}
            {/* {orderNoum}*/}
            <button onClick={e => dispatch({
                type: 'MOVE_UP',
                widget: widget,
                allWidgets: allWidgets
            })}>UP
            </button>
            <button onClick={e => dispatch({
                type: 'MOVE_DOWN',
                widget: widget,
                allWidgets: allWidgets
            })}>Down
            </button>
            {/*{downButton}*/}
            <div hidden={preview}>
                {/*{widget.id}*/}
                {widget.widgetType}
                <select value={widget.widgetType}
                        onChange={e => dispatch({
                            type: 'SELECT_WIDGET_TYPE',
                            id: widget.id,
                            widgetType: selectElement.value
                        })} ref={node => selectElement = node}>
                    <option>Heading</option>
                    <option>Paragraph</option>
                    <option>List</option>
                    <option>Image</option>
                </select>
                <button onClick={e => (dispatch({type: DELETE_WIDGET, id: widget.id})
                )}>
                    Delete Widget
                </button>
            </div>
            <div>
                {widget.widgetType === 'Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType === 'Paragraph' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType === 'List' && <ListContainer widget={widget}/>}
                {widget.widgetType === 'Image' && <ImageContainer widget={widget}/>}
            </div>
        </li>
    )

};

/*const dispatchToPropsMapper2 = dispatch => ({
    moveUp: (widget,allWidgets) => actions.moveUp(dispatch,widget,allWidgets)
});*/

const WidgetContainer = connect(state => ({
    preview: state.preview,
    orderArray: state.orderArray,
    downButton: state.downButton
}))(Widget);
export default WidgetContainer;