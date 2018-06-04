import React from 'react';
import {Link} from 'react-router-dom'
import $ from 'jquery'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import '../../css/CourseManager.style.client.css'
import '../../css/ModuleEditor.style.client.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'

import CourseService from '../../services/CourseService';
import ModuleService from '../../services/ModuleService';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


const SortableItem = SortableElement(({value, onRemove, click}) =>
    <a className="clickedStyles">
        <span className="moduletext" onClick={() => click(value)}><i className="fa fa-book module-icon"></i>
            {/*<Link to={`/course/module/lesson/62`} className="table-data-width">*/}{/*</Link>*/}
            {value}</span>
        <span><i className="fa fa-minus-circle module-delete-icon" onClick={() => onRemove(value)}></i></span>
    </a>
);


const SortableList = SortableContainer(({items, onRemove, click}) => {
    return (
        <div>
            <span className="module-topic">Modules</span>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index}
                              value={value} onRemove={onRemove}
                              click={click}/>
            ))}
        </div>
    );
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.moduleService = ModuleService.instance;
        this.courseService = CourseService.instance;
        this.state = {
            moduleList: [],
            title: [],
            module: {title: ''},
            courseId: '',
            moduleId: '',
            open: false,
            deleteModuleVal:''
        };
        this.setModuleList = this.setModuleList.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        /*this.findAllModulesForCourse = this.findAllModulesForCourse(this);*/
    }

    componentDidMount() {
        this.setModuleList(this.props.moduleList);
        this.setCourseId(this.props.courseId);
    }

    /*    componentWillReceiveProps(newProps) {
            this.setModuleList(newProps.moduleList);
            this.setCourseId(newProps.courseId);
        }*/

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.moduleList !== prevState.moduleList) {
            return {moduleList: prevState.moduleList};
        }
        if (nextProps.courseId !== prevState.courseId) {
            return {courseId: prevState.courseId};
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.moduleList !== this.props.moduleList) {
            this.setModuleList(this.props.moduleList);
        }
        if (prevProps.courseId !== this.props.courseId) {
            this.setCourseId(this.props.courseId);
        }
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
        console.log(this.state);
    }

    setModuleList(moduleList) {
        this.setState({moduleList: moduleList});
        this.setState({
            title: moduleList.map(
                moduleList => moduleList.title
            )
        })
    }

    deleteModule() {
        /*  let object = {};*/
        this.handleClose();
        let index = this.state.deleteModuleVal;
        var results = this.state.moduleList.filter(function (module) {
            return module.title.indexOf(index) > -1;
        });

        /*let position = this.state.title.indexOf(index);
        object = this.state.moduleList[position];*/
        console.log(results);
        this.moduleService
            .deleteModule(results[0].id)
            .then(() => {
                this.removeModule();
            });

    }

    handleClickOpen = (val) => {
        this.setState({open: true, deleteModuleVal: val});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    generateLesson(index) {
        if(document.getElementById("lesson-input-id") != null)
        {
            document.getElementById("lesson-input-id").style.display = "block";
        }
        if(document.getElementById("topic-input-id") != null)
        {
            document.getElementById("topic-input-id").style.display = "none";
        }

        var arr = this.state.moduleList.filter(function (module) {
            return module.title.indexOf(index) > -1;
        });
        this.setState({moduleId: arr[0].id});
        console.log(this.state);
        this.props.handlerFromParant(arr[0].id, index);
    }

    removeModule() {
        document.getElementById("topic-input-id").style.display = "none";
        document.getElementById("lesson-input-id").style.display = "none";
        let ccid = this.state.courseId;
        /*        const itemTobeRemovedFromModule = this.state.moduleList;
                const itemTobeRemovedFromTitle = this.state.title;
                itemTobeRemovedFromModule.splice(index, 1);
                itemTobeRemovedFromTitle.splice(index, 1);

                this.setState({moduleList: itemTobeRemovedFromModule});
                this.setState({title: itemTobeRemovedFromTitle});*/
        alert("Module Deleted");
        this.findAllModulesForCourse(ccid);
    }

    setModuleTitle(event) {
        this.setState({
            module: {
                title: event.target.value
            }
        })
    }

    createModule() {
        let ccid = this.state.courseId;
        this.moduleService
            .createModule(this.state.courseId, this.state.module)
            .then((response) => {
                this.findAllModulesForCourse(ccid);
                this.setState({
                    module: {
                        title: ''
                    }
                })
                alert("Module Added");
            });
    }


    findAllModulesForCourse(id) {
        console.log(this);
        this.courseService.findCourseById(id)
            .then((courses) => {
                /*this.setState({moduleList: courses.modules});*/
                this.setModuleList(courses.modules);
                console.log(courses);
                alert("Module List Loaded");
            });
    }


    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            title: arrayMove(this.state.title, oldIndex, newIndex),
        });
    };

    render() {
        return (
            <div className="sidenav module-menu col-2">
                <div className="form-group custom-module-box row">
                    <input type="text" className="form-control module-textbox"
                           value={this.state.module.title} onChange={this.setModuleTitle}
                           placeholder="Add Module"/>
                    <i className="fa fa-plus-circle module-submit-btn" onClick={this.createModule}></i>
                </div>
                <SortableList items={this.state.title} onSortEnd={this.onSortEnd}
                              onRemove={(index) => this.handleClickOpen(index)}
                              click={(index) => this.generateLesson(index)}
                              lockAxis="y" axis="y"/>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Are you sure you want to delete this module?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            A module once deleted cannot be recovered. Please choose the appropriate option.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.deleteModule} color="primary">
                            Yes
                        </Button>
                        <Button onClick={this.handleClose} color="secondary">
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>)
    }
}