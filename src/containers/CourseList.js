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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.search = this.search.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {courses: [],course: {title: ''},
            open: false,
            deleteCourseVal:''};
    }

    componentDidMount() {
        console.log("message2");
        this.findAllCourses();
    }

    handleClickOpen = (val) => {
        this.setState({ open: true ,deleteCourseVal:val});
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
                console.log(courses);
               // alert("Table Data Refreshed");
            });
    }

    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => {
                this.findAllCourses();
                this.setState({
                    course: {title: ''}
                });
                alert("Course created");
            });
    }

    deleteCourse() {
        this.handleClose();
        let courseId = this.state.deleteCourseVal;
        this.courseService
            .deleteCourse(courseId)
            .then(() => {
                this.findAllCourses();
                alert("Course deleted");
            });
    }


    renderCourseRows() {
        let courses = null;
        if (this.state) {
            courses = this.state.courses.map(
                (course) => {
                    return <CourseRow key={course.id} course={course} delete={this.handleClickOpen}/>
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

    search(event) {
        var title = event.target.value;

        var inputData;
        var modData;
        var tableDom;
        var tr;
        var td;
        var index;

        inputData = title;
        modData = inputData.toUpperCase();
        tableDom = document.getElementById("myTable");
        tr = tableDom.getElementsByTagName("tr");
        for (index = 0; index < tr.length; index++) {
            td = tr[index].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(modData) > -1) {
                    tr[index].style.display = "";
                } else {
                    tr[index].style.display = "none";
                }
            }
        }

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
                            <Typography variant="title" color="inherit" className="appbarTitle">
                                Course Manager
                            </Typography>
                            <div className="form-group customBox">
                                <input type="text" className="form-control panel-textbox" id="usr"
                                       placeholder="New Course Title" onChange={this.titleChanged}
                                value={this.state.course.title}/>
                            </div>
                            <button className="btn btn-primary" onClick={this.createCourse}>
                                <i className="fa fa-plus"></i>
                            </button>
                            <div className="form-group customBox">
                                <input type="text" className="form-control panel-textbox" id="usr"
                                       placeholder="Search Course Name" onChange={this.search}/>
                            </div>
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
                    <table id="myTable">
                        <tbody>
                        {this.renderCourseRows()}
                        </tbody>
                    </table>
                </div>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Are you sure you want to delete this course?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            A course once deleted cannot be recovered. Please choose the appropriate option.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.deleteCourse} color="primary">
                            Yes
                        </Button>
                        <Button onClick={this.handleClose} color="secondary">
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default CourseList;