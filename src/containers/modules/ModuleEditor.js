import React from 'react';
import LessonService from '../../services/LessonSevice';
import LessonList from "../../components/LessonList";



export default class ModuleEditor extends React.Component {

    constructor(props) {
        super(props);
        this.lessonService = LessonService.instance;
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.findLessonForModule = this.findLessonForModule.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.state = {courseId: '', moduleId: '',lesson:[]};
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.findLessonForModule(this.props.courseId,this.props.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.findLessonForModule(newProps.courseId,newProps.moduleId);
    }

    createLesson(cid,mid,lesson) {
        this.lessonService
            .createLesson(cid,mid,lesson)
            .then((response) => {
                this.findLessonForModule(cid,mid);
            });
    }

    deleteLesson(cid,mid,lessonId) {
        this.lessonService
            .deleteLesson(lessonId)
            .then(() => {
                this.findLessonForModule(cid,mid);
            });
    }


    findLessonForModule(courseId,moduleId) {
        if(courseId!='' && moduleId!='' && courseId!=undefined && moduleId!= undefined)
        {
            this.lessonService.findAllLessonsForModule(courseId,moduleId)
                .then((lessons) => {
                    this.setState({lesson: lessons});
                    console.log(lessons);
                    //this.renderLessonList();
                });
        }

    }

    renderLessonList() {
        let lessons = null;
        if (this.state.lesson.length != 0) {
            return <LessonList lessons={this.state.lesson} delete={this.deleteCourse}
                                courseId={this.props.courseId} moduleId={this.props.moduleId}
                                addHandler={this.createLesson} deleteHandler={this.deleteLesson}/>
        }
/*            lessons = this.state.lesson.map(
                (lessons) => {
                    return <LessonList key={lessons.id} lesson={lessons} delete={this.deleteCourse}/>
                }
            )
        }*/
        return (
            lessons
        )
    }

    deleteCourse()
    {
        console.log("delete");
    }


    setCourseId(courseId) {
        this.setState
        ({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState
        ({moduleId: moduleId});
    }


    render() {
        return (
            <div>
{/*                <h1>Module Editor</h1>
                <h4>{this.state.courseId},{this.state.moduleId}</h4>*/}
                {this.renderLessonList()}
            </div>

        )
    }
}