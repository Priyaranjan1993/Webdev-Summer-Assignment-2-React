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
        this.props.findAllWidgets();
        let count = 0;
    }


    render() {

        return (
            <div>
                <div className="or-spacer">
                    <div className="mask"></div>
                </div>
                <span id="widget-title">Widgets</span>
                {/*<h1>Widget List {this.props.widgets.length}</h1>*/}
                <div className="widget-save-preview-container" hidden={this.props.widgets.length === 0}>
                    <Tooltip id="tooltip-save" title="Save">
                    <button type="button" className="btn btn-success btn-md widget-save-btn"
                            hidden={this.props.previewMode} onClick={this.props.save}> Save
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
                    <AddIcon />
                </Button>
                </Tooltip>
                {/*<button onClick={this.props.addWidget}>
                    Add Widget
                </button>*/}
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
        downButton: state.downButton
    };
};

const mapDispatchToProps = dispatch => ({
    findAllWidgets: () => actions.findAllWidgets(dispatch),
    addWidget: () => actions.addWidget(dispatch),
    save: () => actions.save(dispatch),
    preview: () => actions.preview(dispatch)
});

const WidgetLists = connect(stateToProps, mapDispatchToProps)(WidgetList);

export default WidgetLists;