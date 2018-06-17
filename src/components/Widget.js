import React from 'react'
import {DELETE_WIDGET} from "../constants/index"
import * as actions from '../actions'
import {connect} from 'react-redux'
import $ from 'jquery'
import '../css/WidgetList.style.client.css'
import * as constants from "../constants";
import UpIcon from '@material-ui/icons/ArrowUpward';
import DownIcon from '@material-ui/icons/ArrowDownward';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import FormHelperText from '@material-ui/core/FormHelperText';


const Heading = ({widget, preview, headingTextChanged, headingSizeChanged, widgetNameChanged}) => {
    let selectElem;
    let inputElem;
    let inputWidgetName;
    return (
        <div>
            <h2 className="widget-heading"> Heading Widget</h2>
            <div hidden={preview}>
                <input onChange={() => headingTextChanged(widget.id, inputElem.value)}
                       value={widget.text}
                       ref={node => inputElem = node}/>
                <FormHelperText className="helpText" id="heading-helper-text">Heading Text</FormHelperText>
                <br/>
                <select id="input-dropdown" onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                        value={widget.size}
                        ref={node => selectElem = node}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
                <FormHelperText className="helpText" id="heading-helper-select">Heading Size</FormHelperText>
                <br/>
                <input value={widget.widgetName}
                       onChange={() => widgetNameChanged(widget.id, inputWidgetName.value)}
                       ref={node => inputWidgetName = node}/>
                <FormHelperText className="helpText" id="heading-helper-name">Widget Name</FormHelperText>

                <div className="or-spacer top-change">
                    <div className="mask"></div>
                </div>

                <h3 className="underline">Preview</h3>
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
            <h2 className="widget-heading">Paragraph</h2>
            <div hidden={preview}>
                <textarea value={widget.paragraphText}
                          onChange={() => paraTextChanged(widget.id, paraWidgetVal.value)}
                          ref={node => paraWidgetVal = node}
                          placeholder="Paragraph Text"/>
                <FormHelperText className="helpText" id="paragraph-helper-text">Insert text in the paragraph field
                </FormHelperText>
                <br/>
                <input value={widget.widgetNamePara}
                       onChange={() => widgetParaNameChanged(widget.id, paraWidgetName.value)}
                       ref={node => paraWidgetName = node}/>
                <FormHelperText className="helpText" id="paragraph-helper-name">Widget Name</FormHelperText>
                <br/>

                <div className="or-spacer top-change">
                    <div className="mask"></div>
                </div>
                <h3 className="underline">Preview</h3>
            </div>
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


const List = ({widget, preview, listElemChanged, widgetListNameChanged, listTextChanged}) => {
    let listSelectElem;
    let listWidgetName;
    let listText;
    return (
        <div>
            <h2 className="widget-heading"> List Widget</h2>
            <div hidden={preview}>
                <textarea value={widget.listText}
                          onChange={() => listTextChanged(widget.id, listText.value)}
                          ref={node => listText = node}/>
                <FormHelperText className="helpText" id="list-helper-textarea">Put each item in a separate row
                </FormHelperText>
                <br/>
                <select id="input-dropdown" onChange={() => listElemChanged(widget.id, listSelectElem.value)}
                        value={widget.listSelect}
                        ref={node => listSelectElem = node}>
                    <option value="1">Unordered List</option>
                    <option value="2">Ordered List</option>
                </select>
                <FormHelperText className="helpText" id="list-helper-select">Choose list ordering type
                </FormHelperText>
                <br/>
                <input value={widget.widgetNameList}
                       onChange={() => widgetListNameChanged(widget.id, listWidgetName.value)}
                       ref={node => listWidgetName = node}/>
                <FormHelperText className="helpText" id="list-helper-name">Widget Name
                </FormHelperText>
                <br/>


                <div className="or-spacer top-change">
                    <div className="mask"></div>
                </div>

                <h3 className="underline">Preview</h3>
            </div>
            {widget.listSelect == 1 && <ul>
                {widget.listTextToArray.map((x) => (
                    <li>{x}</li>
                ))}
            </ul>}

            {widget.listSelect == 2 && <ol>
                {widget.listTextToArray.map((x) => (
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


const Link = ({widget, preview, linkTextChanged, linkURLChanged, widgetLinkNameChanged}) => {
    let linkTextName;
    let linkURL;
    let linkWidgetName;
    return (
        <div>
            <h2 className="widget-heading">Link</h2>
            <div hidden={preview}>
                <input value={widget.linkText}
                       onChange={() => linkTextChanged(widget.id, linkTextName.value)}
                       ref={node => linkTextName = node} placeholder="Link Text"/>
                <FormHelperText className="helpText" id="link-helper-text">Type the name of the link
                </FormHelperText>
                <br/>
                <input value={widget.linkUrl}
                       onChange={() => linkURLChanged(widget.id, linkURL.value)}
                       ref={node => linkURL = node} placeholder="Link URL"/>
                <FormHelperText className="helpText" id="link-helper-url">Type the link url
                </FormHelperText>
                <br/>
                <input value={widget.linkName}
                       onChange={() => widgetLinkNameChanged(widget.id, linkWidgetName.value)}
                       ref={node => linkWidgetName = node} placeholder="Link Widget Name"/>
                <FormHelperText className="helpText" id="link-helper-name">Widget Name
                </FormHelperText>
                <br/>
                <div className="or-spacer top-change">
                    <div className="mask"></div>
                </div>
                <h3 className="underline">Preview</h3>
            </div>

            <a href={widget.linkUrl} target="_blank">{widget.linkText}</a>
        </div>
    )
};

const dispatchToPropsMapperLink = dispatch => ({
    linkTextChanged: (widgetId, linkText) =>
        actions.linkTextChanged(dispatch, widgetId, linkText),
    linkURLChanged: (widgetId, linkUrl) =>
        actions.linkURLChanged(dispatch, widgetId, linkUrl),
    widgetLinkNameChanged: (widgetId, linkName) =>
        actions.widgetLinkNameChanged(dispatch, widgetId, linkName)
});

const stateToPropsMapperLink = state => ({
    preview: state.preview
});

const LinkContainer = connect(stateToPropsMapperLink, dispatchToPropsMapperLink)(Link);


const Image = ({widget, preview, assignUrl, searchNameChanged, searchNameRender, widgetImageSrcChanged, widgetNameImageChanged}) => {
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
                {widget.imageArray.items.map((x) => (
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
            {/*            <button onClick={e => dispatch({
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
            </button>*/}

            <div hidden={preview} className="widget-choice-parent">
                <Tooltip id="tooltip-select" title="Select Widget">
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
                        <option>Link</option>
                    </select>
                </Tooltip>
                <Tooltip id="tooltip-delete" title="Delete Widget">
                    <IconButton className="widget-delete-btn"
                                aria-label="Delete"
                                onClick={e => (dispatch({type: DELETE_WIDGET, id: widget.id}))}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
                {/*               <Button onClick={e => (dispatch({type: DELETE_WIDGET, id: widget.id}))}
                        className="widget-delete-btn"
                        variant="fab"
                        mini
                        color="secondary"
                        aria-label="delete widget">
                    <DeleteIcon/>
                </Button>*/}
                {/* <button onClick={e => (dispatch({type: DELETE_WIDGET, id: widget.id}))}>
                    Delete Widget
                </button>*/}
            </div>

            <Tooltip id="tooltip-up" title="Move Up">
                <Button onClick={e => dispatch({
                    type: 'MOVE_UP',
                    widget: widget,
                    allWidgets: allWidgets
                })} className="widget-add-btn" variant="fab" mini
                        color="primary" aria-label="up">
                    <UpIcon/>
                </Button>
            </Tooltip>

            <Tooltip id="tooltip-down" title="Move Down">
                <Button onClick={e => dispatch({
                    type: 'MOVE_DOWN',
                    widget: widget,
                    allWidgets: allWidgets
                })} className="widget-add-btn" variant="fab" mini
                        color="primary" aria-label="down">
                    <DownIcon/>
                </Button>
            </Tooltip>

            <div>
                {widget.widgetType === 'Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType === 'Paragraph' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType === 'List' && <ListContainer widget={widget}/>}
                {widget.widgetType === 'Image' && <ImageContainer widget={widget}/>}
                {widget.widgetType === 'Link' && <LinkContainer widget={widget}/>}
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