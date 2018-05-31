import React from 'react';
import ModuleList from './modules/ModuleList'
import {Link} from 'react-router-dom'
import $ from 'jquery'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import '../css/CourseManager.style.client.css'
import '../css/ModuleEditor.style.client.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Clear from '@material-ui/icons/Clear'
import CourseService from "../services/CourseService";


const SortableItem = SortableElement(({value}) =>
    <li>{value}</li>
);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value}/>
            ))}
        </ul>
    );
});

class SortableComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
        }
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    };

    render() {
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd}/>;
    }
}


class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
        this.state = {
            courseId: '',
            courseTitle: ''
        };
        this.selectCourse = this.selectCourse.bind(this);
        this.setTitle = this.setTitle.bind(this);
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
        this.setTitle(this.props.match.params.courseId);
        $(function(){
            $('.module-menu, .module-content').css({ height: $(window).innerHeight() });
            $(window).resize(function(){
                $('.module-menu, .module-content').css({ height: $(window).innerHeight() });
            });
        });
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId);
        this.setTitle(newProps.match.params.courseId);
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    setTitle(courseId) {
        this.setState({courseId: courseId});
        this.courseService.findCourseById(courseId)
            .then((courses) => {
                this.setState({courseTitle: courses.title});
                console.log(courses);
            });
    }

    render() {
        return (
            <div>
                <div className="root module-header">
                    <AppBar position="static" id="panelStyle">
                        <Toolbar>
                            <IconButton className="menuButton" color="inherit" aria-label="Menu">
                                <Link to={`/courses`} className="back-to-home-link">
                                    <Clear/>
                                </Link>
                            </IconButton>
                            <Typography variant="title" color="inherit">
                                {this.state.courseTitle}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className="row">
                <div className="col-2 module-menu">
                    <SortableComponent/>
                </div>
                <div className="col-10 module-content">
                    <ModuleList courseId={this.state.courseId}/>
                </div>
                </div>
            </div>
        )
    }
}

export default CourseEditor;