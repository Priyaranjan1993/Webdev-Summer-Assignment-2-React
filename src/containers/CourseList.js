import React from 'react';
import CourseRow from './CourseRow'
import CourseService from '../services/CourseService';

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

    courseRows() {
        var rows = this.state.courses.map((course) => {
            return <CourseRow course={course} key={course.id}
                              delete={this.deleteCourse}/>
        });
    }


    courseRows() {
        var rows = this.state.courses.map(function (course) {
            return <CourseRow course={course}/>
        });
        return (
            rows
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
                <h2>Course List</h2>
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
                    {this.courseRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CourseList;