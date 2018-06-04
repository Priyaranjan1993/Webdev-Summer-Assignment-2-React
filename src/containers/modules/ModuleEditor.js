import React from 'react';
import LessonService from '../../services/LessonSevice';
import TopicService from '../../services/TopicService';
import LessonList from "../../components/LessonList";
import TopicRow from '../../components/TopicRow';


export default class ModuleEditor extends React.Component {

    constructor(props) {
        super(props);
        this.lessonService = LessonService.instance;
        this.topicService = TopicService.instance;
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.findLessonForModule = this.findLessonForModule.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.getTopics = this.getTopics.bind(this);
        this.addLessonTitle = this.addLessonTitle.bind(this);
        this.addTopicTitle = this.addTopicTitle.bind(this);
        this.callCreateLessons = this.callCreateLessons.bind(this);
        this.callCreateTopics = this.callCreateTopics.bind(this);
        this.state = {courseId: '', moduleId: '', lesson: [], topics: [],lessonInput: {title: ''},
            topicInput: {title: ''}, lessonId :''};
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.findLessonForModule(this.props.courseId, this.props.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.findLessonForModule(newProps.courseId, newProps.moduleId);
    }

    createLesson(cid, mid, lesson) {
        this.lessonService
            .createLesson(cid, mid, lesson)
            .then((response) => {
                this.findLessonForModule(cid, mid);
                this.setState({
                    lessonInput: {
                        title: ''
                    }
                })
            });
    }

    createTopic(lid,topic){
        this.topicService
            .createTopic(lid, topic)
            .then((response) => {
                this.getTopics(lid);
                this.setState({
                    topicInput: {
                        title: ''
                    }
                })
            });
    }


    deleteLesson(cid, mid, lessonId) {
        this.lessonService
            .deleteLesson(lessonId)
            .then(() => {
                this.findLessonForModule(cid, mid);
            });
    }


    findLessonForModule(courseId, moduleId) {
        if (courseId != '' && moduleId != '' && courseId != undefined && moduleId != undefined) {
            this.lessonService.findAllLessonsForModule(courseId, moduleId)
                .then((lessons) => {
                    this.setState({lesson: lessons});
                    console.log(lessons);
                    //this.renderLessonList();
                });
        }

    }

    getTopics(lessonId) {
        this.setState({lessonId: lessonId});
        this.topicService.findAllTopicsForLesson(lessonId)
            .then((topics) => {
                this.setState({topics: topics});
                console.log(topics);
            })
    }

    renderLessonList() {
        let lessons = null;
        if (this.state.lesson.length != 0) {
            return <LessonList lessons={this.state.lesson} delete={this.deleteCourse}
                               courseId={this.props.courseId} moduleId={this.props.moduleId}
                               addHandler={this.createLesson} deleteHandler={this.deleteLesson}
                               getTopicsHandler={this.getTopics}/>
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

    setCourseId(courseId) {
        this.setState
        ({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState
        ({moduleId: moduleId});
    }

    renderTopicRows() {
        let topics = null;
        if (this.state.topics.length != 0) {
            topics = this.state.topics.map(
                (topic) => {
                    return <TopicRow key={topic.id} topic={topic}/>
                }
            )
        }
        return (
            topics
        )
    }

    addLessonTitle(event) {
        this.setState({
            lessonInput: {
                title: event.target.value
            }
        })
    }

    addTopicTitle(event) {
        this.setState({
            topicInput: {
                title: event.target.value
            }
        })
    }

    callCreateLessons() {
        this.createLesson(this.props.courseId,this.props.moduleId,this.state.lessonInput);
    }


    callCreateTopics(){
        this.createTopic(this.state.lessonId,this.state.topicInput);
    }



    render() {
        return (
            <div className="row">
                <div className="col-7">
                    <div className="form-group custom-lesson-box row">
                        <input type="text" className="form-control module-textbox"
                               value={this.state.lessonInput.title} onChange={this.addLessonTitle}/>
                        <i className="fa fa-plus-circle module-submit-btn" onClick={this.callCreateLessons}></i>
                    </div>
                    <span className="lesson-topic">Lessons</span>
                    {this.renderLessonList()}
                </div>
                <div className="col-4">
                    <div className="form-group custom-topic-box row">
                        <input type="text" className="form-control module-textbox"
                               value={this.state.topicInput.title} onChange={this.addTopicTitle}/>
                        <i className="fa fa-plus-circle topic-submit-btn" onClick={this.callCreateTopics}></i>
                    </div>
                    <table>
                        <tbody>
                        {this.renderTopicRows()}
                        </tbody>
                    </table>
                </div>

            </div>


        )
    }
}