import React from 'react';
import * as actions from '../actions/index';
import WidgetContainer from '../components/Widget'
import {connect} from 'react-redux'
import '../css/WidgetList.style.client.css'
import $ from 'jquery'


class WidgetList extends React.Component {

    constructor(props) {
        super(props);
        this.props.findAllWidgets();
        let count = 0;
    }



    render() {
/*        $(".reorder-up").click(function(){
            var $current = $(this).closest('li')
            var $previous = $current.prev('li');
            if($previous.length !== 0){
                $current.insertBefore($previous);
            }
            return false;
        });

        $(".reorder-down").click(function(){
            var $current = $(this).closest('li')
            var $next = $current.next('li');
            if($next.length !== 0){
                $current.insertAfter($next);
            }
            return false;
        });*/

        return (
            <div>
                <h1>Widget List {this.props.widgets.length}</h1>
                <button type="button" className="btn btn-success"
                        hidden={this.props.previewMode} onClick={this.props.save}> Save</button>
                <button onClick={this.props.preview}>Preview</button>
                <ul>
                    {this.props.widgets.map(
                            widget => {
                                return (
                                <WidgetContainer widget={widget}
                                                 preview={this.props.previewMode}
                                                 key={widget.id} orderNoum={this.props.orderNo}
                                                 allWidgets ={this.props.widgets}
                                                 downButton ={this.props.downButton}/>)
                            }
                        ).sort(function (a,b) {
                        return a.props.widget.orderNum - b.props.widget.orderNum;
                    })
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
        previewMode: state.preview,
        orderNo:state.orderNumber,
        orderArray:state.orderArray,
        downButton : state.downButton
    };
};

const mapDispatchToProps = dispatch => ({
        findAllWidgets: () => actions.findAllWidgets(dispatch),
        addWidget:() => actions.addWidget(dispatch),
        save:() => actions.save(dispatch),
        preview: () => actions.preview(dispatch)
});

const WidgetLists = connect(stateToProps, mapDispatchToProps)(WidgetList);

export default WidgetLists;