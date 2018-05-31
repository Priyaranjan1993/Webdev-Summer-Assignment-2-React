import React from 'react';
import ModuleList from './modules/ModuleList'
import {Link} from 'react-router-dom'

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


class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
        this.state = {courseId: '',courseTitle:''};
        this.selectCourse = this.selectCourse.bind(this);
        this.setTitle = this.setTitle.bind(this);
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
        this.setTitle(this.props.match.params.courseId);
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

    /*setCourseId(courseId) {
        this.setState({courseId: courseId});
    }*/


    render() {
        return (
            <div>
                <div className="root">
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
                <div className="col-4">
                    <ModuleList courseId={this.state.courseId}/>
                </div>
            </div>
        )
    }
}

export default CourseEditor;