import React from 'react';
import CourseRow from '../components/CourseRow'
import CourseService from '../services/CourseService';
import '../css/CourseManager.style.client.css'
import $ from 'jquery'
import '../../node_modules/font-awesome/css/font-awesome.min.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.state = {courses: []};
    }

    componentDidMount() {
        console.log("message2");
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
                console.log(courses);
            });
    }

    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => {
                this.findAllCourses();
            });
    }

    deleteCourse(courseId) {
        this.courseService
            .deleteCourse(courseId)
            .then(() => {
                this.findAllCourses();
            });
    }


    renderCourseRows() {
        let courses = null;
        if (this.state) {
            courses = this.state.courses.map(
                (course) => {
                    return <CourseRow key={course.id} course={course} delete={this.deleteCourse}/>
                }
            )
        }
        return (
            courses
        )
    }


    titleChanged(event) {
        this.setState({
            course: {title: event.target.value}
        });
    }


    render() {
        return (
            <div>
                <div className="root">
                    <AppBar position="static" id="panelStyle">
                        <Toolbar>
                            <IconButton className="menuButton" color="inherit" aria-label="Menu">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="title" color="inherit">
                                Course Manager
                            </Typography>
                            <div className="form-group customBox">
                                <input type="text" className="form-control panel-textbox" id="usr"
                                       placeholder="New Course Title" onChange={this.titleChanged}/>
                            </div>
                            <button className="btn btn-primary" onClick={this.createCourse}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className="table-Header">
                    <div className="float-left title-Width">Title</div>
                    <div className="float-left owner-Width">Owner</div>
                    <div className="float-left d-last-modified-Width">Date Last Modified</div>
                    <div className="float-left t-last-modified-Width">Action</div>
                </div>
                <div className="div-parent">
                    <table>
                        <tbody>
                        {this.renderCourseRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default CourseList;