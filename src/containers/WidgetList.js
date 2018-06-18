import React from 'react';
import * as actions from '../actions/index';
import WidgetContainer from '../components/Widget'
import {connect} from 'react-redux'
import '../css/WidgetList.style.client.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';


class WidgetList extends React.Component {

    constructor(props) {
        super(props);
        this.props.findAllWidgets(this.props.lessonId);
        let count = 0;
    }

    componentDidUpdate(prevProps) {
        if (this.props.lessonId !== prevProps.lessonId) {
            this.props.findAllWidgets(this.props.lessonId);
        }
    }


    render() {

        return (
            <div>
                <div className="line-spacer">
                    <div className="mask"></div>
                </div>
                <span id="widget-title">Widgets of <span className="text-uppercase font-weight-bold">
                    {this.props.lessonName}</span></span>
                {/*<h1>Widget List {this.props.widgets.length}</h1>*/}
                <div className="widget-save-preview-container">
                    <Tooltip id="tooltip-save" title="Save">
                        <button type="button" className="btn btn-success btn-md widget-save-btn"
                                hidden={this.props.previewMode} onClick={() => this.props.save(this.props.lessonId)}> Save
                        </button>
                    </Tooltip>
                    <Tooltip id="tooltip-preview" title="Preview">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.props.previewMode}
                                    onChange={this.props.preview}
                                    color="primary"
                                />
                            }
                            label="Preview"
                            hidden={this.props.widgets.length === 0}
                        />
                    </Tooltip>
                </div>
                <ul className="widget-parent-container">
                    {this.props.widgets.map(
                        widget => {
                            return (
                                <WidgetContainer widget={widget}
                                                 preview={this.props.previewMode}
                                                 key={widget.id} orderNoum={this.props.orderNo}
                                                 allWidgets={this.props.widgets}
                                                 downButton={this.props.downButton}/>)
                        }
                    ).sort(function (a, b) {
                        return a.props.widget.orderNum - b.props.widget.orderNum;
                    })
                    }
                </ul>
                <Tooltip id="tooltip-add" title="Add Widget">
                    <Button className="widget-add-btn" variant="fab" mini
                            color="primary" aria-label="add"
                            onClick={this.props.addWidget}>
                        <AddIcon/>
                    </Button>
                </Tooltip>
                <div id="success">Data Saved</div>
                <div id="error">Error in saving. Please keep distinct widget names.</div>
                <div id="view">Data loaded successfully.</div>
                <div id="top">The widget you clicked is already at the top position.</div>
                <div id="bottom">The widget you clicked is already at the bottom position.</div>
                <div id="reposition">Widgets repositioned.</div>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        widgets: state.widgets,
        previewMode: state.preview,
        orderNo: state.orderNumber,
        orderArray: state.orderArray,
        downButton: state.downButton,
    };
};

const mapDispatchToProps = dispatch => ({
    findAllWidgets: (lessonId) => actions.findAllWidgets(dispatch, lessonId),
    addWidget: () => actions.addWidget(dispatch),
    save: (lessonId) => actions.save(dispatch,lessonId),
    preview: () => actions.preview(dispatch)
});

const WidgetLists = connect(stateToProps, mapDispatchToProps)(WidgetList);

export default WidgetLists;