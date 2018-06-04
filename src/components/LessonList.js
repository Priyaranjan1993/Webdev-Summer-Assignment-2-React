import React from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import LessonService from '../services/LessonSevice';

import Chip from '@material-ui/core/Chip';


const SortableItem = SortableElement(({value,onRemove,click}) =>
    <a className="clickedStyles" onClick={() => click(value)}>
   {/* <li className="lessonListChild">*/}
       {/* <Chip className="chip-style" label={value}/>*/}
        <span className="lessonTitle">{value}</span>
        {/*onClick={handleClick}*/}
    {/*</li>*/}
        <i className="fa fa-minus-circle module-delete-icon" onClick={() => onRemove(value)}></i>
    </a>
);


const DraggableLessons = SortableContainer(({items,onRemove,click}) => {
    return (
        <div className="lessonListParent">
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index}
                              value={value} onRemove={onRemove}
                              click={click}/>
            ))}
        </div>
    );
});

class LessonList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lessonTitleList: [],
            lesson: {title: ''},
            lessonList :[]
        };
        this.lessonService = LessonService.instance;
        this.setLessonTitle = this.setLessonTitle.bind(this);
        /*this.addLessonTitle = this.addLessonTitle.bind(this);
        this.createLessons = this.createLessons.bind(this);*/
    }

    componentDidMount() {
        this.setLessonTitle(this.props.lessons);
        this.setLessonList(this.props.lessons);
    }

/*    componentWillReceiveProps(newProps) {
        this.setLessonTitle(newProps.lessons);
    }*/

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.lessons!==prevState.lessons){
            return { lessonList: nextProps.lessons};
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.lessons!==this.props.lessons){
            //Perform some operation here
            this.setLessonTitle(this.props.lessons);
        }
    }
    setLessonTitle(lessonList) {
        this.setState({
            lessonTitleList: lessonList.map(
                lessonList => lessonList.title
            )
        })
    }

    setLessonList(lessonList) {
        this.setState({lessonList: lessonList});
    }


    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            lessonTitleList: arrayMove(this.state.lessonTitleList, oldIndex, newIndex),
        });
    };

/*    addLessonTitle(event) {
        this.setState({
            lesson: {
                title: event.target.value
            }
        })
    }

    createLessons() {
        this.props.addHandler(this.props.courseId,this.props.moduleId,this.state.lesson);
    }*/

    deleteModule(index) {
/*
        let object = {};
        let position = this.state.lessonTitleList.indexOf(index);
        object = this.props.lessons[position];
*/

        var results = this.props.lessons.filter(function(lesson) {
            return lesson.title.indexOf(index) > -1;
        });

/*        console.log("delete------"+object);*/
        this.deleteLessons(results[0].id);
    }

    generateTopic(index) {
/*
        let object = {};
        let position = this.state.lessonTitleList.indexOf(index);
        object = this.props.lessons[position];
*/

        var results = this.props.lessons.filter(function(lesson) {
            return lesson.title.indexOf(index) > -1;
        });

        this.retriveTopics(results[0].id);
    }

    retriveTopics(lessonId){
        this.props.getTopicsHandler(lessonId);
    }


    deleteLessons(lessonId){
        this.props.deleteHandler(this.props.courseId,this.props.moduleId,lessonId);
    }


    render() {
        return (
                <div className="lessonListDiv">
                    {/*<div className="form-group custom-lesson-box row">
                        <input type="text" className="form-control module-textbox"
                               value={this.state.lesson.title} onChange={this.addLessonTitle}/>
                        <i className="fa fa-plus-circle module-submit-btn" onClick={this.createLessons}></i>
                    </div>*/}
                    <div className="sidenav col-4 customLessonParent">
                    <DraggableLessons items={this.state.lessonTitleList} onSortEnd={this.onSortEnd}
                                      onRemove={(index) => this.deleteModule(index)}
                                      click={(index) => this.generateTopic(index)}
                                      lockAxis="y" axis="y"/>
                    </div>
                </div>
        )
    }
}

export default LessonList;