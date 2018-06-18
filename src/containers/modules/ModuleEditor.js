import React from 'react';
import LessonService from '../../services/LessonSevice';
import TopicService from '../../services/TopicService';
import LessonList from "../../components/LessonList";
import TopicRow from '../../components/TopicRow';

import WidgetList from '../WidgetList'

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
        this.getWidgets = this.getWidgets.bind(this);
        /*this.preGetTopics = this.preGetTopics.bind(this);*/
        this.preGetWidegts = this.preGetWidegts.bind(this);
        this.addLessonTitle = this.addLessonTitle.bind(this);
        this.addTopicTitle = this.addTopicTitle.bind(this);
        this.callCreateLessons = this.callCreateLessons.bind(this);
        this.callCreateTopics = this.callCreateTopics.bind(this);
        this.state = {
            courseId: '', moduleId: '', lesson: [], topics: [], lessonInput: {title: ''},
            topicInput: {title: ''}, lessonId: '', lessonName: ''
        };
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.findLessonForModule(this.props.courseId, this.props.moduleId);
        /* document.getElementById("topic-input-id").style.display = "none";*/
        this.setState({topics: []});
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.findLessonForModule(newProps.courseId, newProps.moduleId);
        this.setState({topics: []});
        this.setState({lessonId: ''});
        document.getElementById("widget-parent-container").style.display = "none";
    }

    createLesson(cid, mid, lesson) {
        this.lessonService
            .createLesson(cid, mid, lesson)
            .then((response) => {
                this.findLessonForModule(cid, mid);
                alert("Lesson created");
                this.setState({
                    lessonInput: {
                        title: ''
                    }
                })
            });
    }

    createTopic(lid, topic) {
        this.topicService
            .createTopic(lid, topic)
            .then((response) => {
                this.getTopics(lid);
                alert("Topic created");
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
                alert("Lesson deleted");
                this.setState({topics: []});
                this.setState({
                    topicInput: {
                        title: ''
                    }
                })
                document.getElementById("widget-parent-container").style.display = "none";
            });
    }


    findLessonForModule(courseId, moduleId) {
        if (courseId != '' && moduleId != '' && courseId != undefined && moduleId != undefined) {
            this.lessonService.findAllLessonsForModule(courseId, moduleId)
                .then((lessons) => {
                    this.setState({lesson: lessons});
                    //alert("Lesson List Refreshed");
                    console.log(lessons);
                    //this.renderLessonList();
                });
        }

    }

    preGetTopics(lessonId, val, name) {
        console.log("No action plz")
        /*if (val == true) {
            document.getElementById("topic-input-id").style.display = "block";
            this.getTopics(lessonId);
            this.setState({lessonName: name});
        }
        else {
            document.getElementById("topic-input-id").style.display = "none";
        }*/
    }

    getTopics(lessonId) {
        this.setState({lessonId: lessonId});
        this.topicService.findAllTopicsForLesson(lessonId)
            .then((topics) => {
                this.setState({topics: topics});
                //alert("Topic List Rendered");
                console.log(topics);
            })
    }

    preGetWidegts(lessonId, val, name) {
        if (val == true) {
            document.getElementById("widget-parent-container").style.display = "block";
            this.getWidgets(lessonId);
            this.setState({lessonName: name});
        }
        else {
            document.getElementById("widget-parent-container").style.display = "none";
        }
    }

    getWidgets(lessonId) {
        this.setState({lessonId: lessonId});
        // return <WidgetList lessonId={lessonId}/>
    }

    renderLessonList() {
        let lessons = null;
        if (this.state.lesson.length != 0) {
            return <LessonList lessons={this.state.lesson} delete={this.deleteCourse}
                               courseId={this.props.courseId} moduleId={this.props.moduleId}
                               addHandler={this.createLesson} deleteHandler={this.deleteLesson}
                               getTopicsHandler={this.preGetWidegts}/>
            /*getTopicsHandler={this.preGetTopics}*/
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

    /*  renderTopicRows() {
          let topics = null;
          if (this.state.topics.length != 0) {
              document.getElementById("topic-input-id").style.display = "block";
              topics = this.state.topics.map(
                  (topic) => {
                      return <TopicRow key={topic.id} topic={topic}/>
                  }
              )
          }
          return (
              topics
          )
      }*/

    renderWidgets() {
        if (this.state.lessonId != 0 && this.state.lessonId != "" && this.state.lessonId != undefined) {
            document.getElementById("widget-parent-container").style.display = "block";
            return <WidgetList lessonId={this.state.lessonId}/>
        }
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
        this.createLesson(this.props.courseId, this.props.moduleId, this.state.lessonInput);
    }


    callCreateTopics() {
        this.createTopic(this.state.lessonId, this.state.topicInput);
    }


    render() {
        return (
            <div className="">
                <div className="col-12" id="lesson-input-id">
                    <div className="form-group custom-lesson-box row">
                        <input type="text" className="form-control module-textbox"
                               value={this.state.lessonInput.title} onChange={this.addLessonTitle}
                               placeholder="Add Lesson"/>
                        <i className="fa fa-plus-circle module-submit-btn" onClick={this.callCreateLessons}></i>
                    </div>
                    <span className="lesson-topic">Lessons
                        for <span className="text-uppercase font-weight-bold">{this.props.moduleName}</span></span>
                    {this.renderLessonList()}
                </div>
                <div id="widget-parent-container">
                    {this.renderWidgets()}
                </div>
                {/*<div className="col-4 topicdiv" id="topic-input-id">
                    <div>
                        <div className="form-group custom-topic-box row">
                            <input type="text" className="form-control module-textbox"
                                   value={this.state.topicInput.title} onChange={this.addTopicTitle}
                                   placeholder="Add Topic"/>
                            <i className="fa fa-plus-circle topic-submit-btn" onClick={this.callCreateTopics}></i>
                        </div>
                        <span className="lesson-topic">Topics for Module
                            <span className="text-uppercase font-weight-bold"> {this.props.moduleName}</span> and lesson
                            <span className="text-uppercase font-weight-bold"> {this.state.lessonName}</span></span>
                    </div>
                    <table className="topic-table">
                        <tbody>
                        {this.renderTopicRows()}
                        </tbody>
                    </table>
                </div>*/}

            </div>


        )
    }
}