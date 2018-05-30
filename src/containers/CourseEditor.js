import React from 'react';
import ModuleList from './modules/ModuleList'

class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {courseId: ''};
        this.selectCourse = this.selectCourse.bind(this);
        //this.setCourseId = this.setCourseId.bind(this);
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
        //this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.selectCourse(newProps.match.params.courseId);
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    /*setCourseId(courseId) {
        this.setState({courseId: courseId});
    }*/


    render() {
        return (<h3>
            <div>
                Edit for Course {this.state.courseId}
                <div className="col-4">
                    <ModuleList courseId={this.state.courseId}/>
                </div>
            </div>
        </h3>)
    }
}

export default CourseEditor;