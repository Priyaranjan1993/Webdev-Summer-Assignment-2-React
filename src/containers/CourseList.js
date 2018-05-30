import React from 'react';
import CourseRow from '../components/CourseRow'
import CourseService from '../services/CourseService';
import '../css/CourseManager.style.client.css'
import $ from 'jquery'

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
            .deleteCourse(courseId);
    }


    renderCourseRows() {
        let courses = null;

        //console.log("render course rows");
        //console.log(this.state);
        if (this.state) {
            courses = this.state.courses.map(
                function (course) {
                    return <CourseRow key={course.id}
                                      course={course}/>
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

    createCourse() {
        console.log(this.state.course);

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
                                <input type="text" className="form-control panelTextbox" id="usr"
                                       placeholder="New Course Title"/>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className="table-Header">
                    <div className="float-left title-Width">Title</div>
                    <div className="float-left owner-Width">Owner</div>
                    <div className="float-left d-last-modified-Width">Date Last Modified</div>
                    <div className="float-left t-last-modified-Width">Time Last Modified</div>
                </div>
                <div className="div-parent">
                    {/*                <h2>Course List</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                    </tr>
                    <tr>
                        <th><input id="titleFld"
                                   placeholder="cs101" onChange={this.titleChanged}/></th>
                        <th>
                            <button onClick={this.createCourse}>Add</button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderCourseRows()}
                    </tbody>
                </table>*/}
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