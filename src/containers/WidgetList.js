import React from 'react';
import * as actions from '../actions/index';
import WidgetContainer from '../components/Widget'
import {connect} from 'react-redux'


class WidgetList extends React.Component {

    constructor(props) {
        super(props);
        this.props.findAllWidgets();
    }

    render() {
        return (
            <div>
                <h1>Widget List {this.props.widgets.length}</h1>
                <button hidden={this.props.previewMode} onClick={this.props.save}> Save</button>
                <button onClick={this.props.preview}>Preview</button>
                <ul>
                    {this.props.widgets.map(
                            widget => {
                                return (
                                <WidgetContainer widget={widget}
                                                 preview={this.props.previewMode}
                                                 key={widget.id}/>)
                            }
                        )
                    }
                </ul>
                <button onClick={this.props.addWidget}>
                    Add Widget
                </button>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        widgets: state.widgets,
        previewMode: state.preview
    };
};

/*const dispatcherToPropsMapper = dispatch => ({
    findAllWidgets: () => actions.findAllWidgets(dispatch),
    addWidget: () => actions.addWidget(dispatch),
    save: () => actions.save(dispatch),
    preview: () => actions.preview(dispatch)
})*/

const mapDispatchToProps = dispatch => ({
        findAllWidgets: () => actions.findAllWidgets(dispatch),
        addWidget:() => actions.addWidget(dispatch),
        save:() => actions.save(dispatch),
        preview: () => actions.preview(dispatch)
});

const WidgetLists = connect(stateToProps, mapDispatchToProps)(WidgetList);

export default WidgetLists;