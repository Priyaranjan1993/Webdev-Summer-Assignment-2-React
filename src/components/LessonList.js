import React from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import LessonService from '../services/LessonSevice';
import $ from 'jquery'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Chip from '@material-ui/core/Chip';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const SortableItem = SortableElement(({value, onRemove, click}) =>
    <a className="clickedStyles lessonTabs-Align" onClick={() => click(value)}>
        {/* <li className="lessonListChild">*/}
        {/* <Chip className="chip-style" label={value}/>*/}
        <span className="lessonTitle">{value}</span>
        {/*onClick={handleClick}*/}
        {/*</li>*/}
        <i className="fa fa-minus-circle lesson-delete-icon" onClick={() => onRemove(value)}></i>
    </a>
);


const DraggableLessons = SortableContainer(({items, onRemove, click}) => {
    return (
        <div className="lessonListParent row" id="lessonListParentId">
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
            lessonList: [],
            open: false,
            deletelessonVal:''
        };
        this.lessonService = LessonService.instance;
        this.setLessonTitle = this.setLessonTitle.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.lessons !== prevState.lessons) {
            return {lessonList: nextProps.lessons};
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.lessons !== this.props.lessons) {
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

    deleteLesson() {
        /*
                let object = {};
                let position = this.state.lessonTitleList.indexOf(index);
                object = this.props.lessons[position];
        */
        this.handleClose();
        let index = this.state.deletelessonVal;
        var results = this.props.lessons.filter(function (lesson) {
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

        var results = this.props.lessons.filter(function (lesson) {
            return lesson.title.indexOf(index) > -1;
        });

        this.retriveTopics(results[0].id,index);
    }

    handleClickOpen = (val) => {
        this.setState({ open: true ,deletelessonVal:val});
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    retriveTopics(lessonId,index) {
        this.props.getTopicsHandler(lessonId,true,index);
    }


    deleteLessons(lessonId) {
        this.props.deleteHandler(this.props.courseId, this.props.moduleId, lessonId);
    }


    render() {
        return (
            <div className="lessonListDiv">
                {/*<div className="form-group custom-lesson-box row">
                        <input type="text" className="form-control module-textbox"
                               value={this.state.lesson.title} onChange={this.addLessonTitle}/>
                        <i className="fa fa-plus-circle module-submit-btn" onClick={this.createLessons}></i>
                    </div>*/}
                <div className="sidenav col-12">
                    <DraggableLessons items={this.state.lessonTitleList} onSortEnd={this.onSortEnd}
                                      onRemove={(index) => this.handleClickOpen(index)}
                                      click={(index) => this.generateTopic(index)}
                                      lockAxis="xy" axis="xy"/>
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
                        {"Are you sure you want to delete this lesson?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            A lesson once deleted cannot be recovered. Please choose the appropriate option.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.deleteLesson} color="primary">
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

export default LessonList;