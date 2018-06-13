import React from 'react';
import ModuleList from './modules/ModuleList'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import $ from 'jquery'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import '../css/CourseManager.style.client.css'
import '../css/ModuleEditor.style.client.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import './modules/ModuleEditor'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Clear from '@material-ui/icons/Clear'
import CourseService from '../services/CourseService';
import ModuleEditor from "./modules/ModuleEditor";


class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
        this.state = {
            courseId: '',
            courseTitle: '',
            moduleList: [],
            moduleId: '',
            moduleName: ''
        };
        this.selectCourse = this.selectCourse.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.getModuleId = this.getModuleId.bind(this);
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
        this.setTitle(this.props.match.params.courseId);
        $(function () {
            $('.module-menu, .module-content').css({height: $(window).innerHeight()});
            $(window).resize(function () {
                $('.module-menu, .module-content').css({height: $(window).innerHeight()});
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
                this.setState({courseTitle: courses.title, moduleList: courses.modules});
                console.log(courses);
            });
    }

    getModuleId(data, val) {
        this.setState({
            moduleId: data, moduleName: val
        });
        //console.log("from ceditor list -- "+this.state);
        //alert(this.state.moduleId);
    }

    renderLessonRows() {
        if (this.state.moduleId != '' && this.state.moduleId != undefined) {
            return <ModuleEditor courseId={this.state.courseId} moduleId={this.state.moduleId}
                                 moduleName={this.state.moduleName}/>
        }
        else {
            return null;
        }
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
                    <ModuleList moduleList={this.state.moduleList} courseId={this.state.courseId}
                                handlerFromParant={this.getModuleId}/>
                    <div className="col-10 module-content">
                        {this.renderLessonRows()}
                    </div>
                </div>
            </div>
        )
    }
}

export default CourseEditor;