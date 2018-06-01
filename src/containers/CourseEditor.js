import React from 'react';
import ModuleList from './modules/ModuleList'
import {Link} from 'react-router-dom'
import $ from 'jquery'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import '../css/CourseManager.style.client.css'
import '../css/ModuleEditor.style.client.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Clear from '@material-ui/icons/Clear'
import CourseService from '../services/CourseService';
import ModuleService from '../services/ModuleService';


const SortableItem = SortableElement(({value, onRemove, click}) =>
    <a className="clickedStyles" onClick={() => click(value)}>
        <i className="fa fa-book module-icon"></i>{value}
        <i className="fa fa-minus-circle module-delete-icon" onClick={() => onRemove(value)}></i>
    </a>
);


const SortableList = SortableContainer(({items, onRemove, click}) => {
    return (
        <div>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index}
                              value={value} onRemove={onRemove}
                              click={click}/>
            ))}
        </div>
    );
});

class SortableComponent extends React.Component {

    constructor(props) {
        super(props);
        this.moduleService = ModuleService.instance;
        this.courseService = CourseService.instance;
        this.state = {
            moduleList: [],
            title: [],
            module: {title: ''},
            courseId: ''
        }
        this.setModuleList = this.setModuleList.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.createModule = this.createModule.bind(this);
        /*this.findAllModulesForCourse = this.findAllModulesForCourse(this);*/
    }

    componentDidMount() {
        this.setModuleList(this.props.moduleList);
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setModuleList(newProps.moduleList);
        this.setCourseId(newProps.courseId)
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

    deleteModule(index) {
        var object = {};
        var position = this.state.title.indexOf(index);
        object = this.state.moduleList[position];
        console.log(object);
        this.moduleService
            .deleteModule(object.id)
            .then(() => {
                this.removeModule(position);
            });

    }

    generateLesson(index) {
        alert(index);
    }

    removeModule(index) {
        const itemTobeRemovedFromModule = this.state.moduleList;
        const itemTobeRemovedFromTitle = this.state.title;
        itemTobeRemovedFromModule.splice(index, 1);
        itemTobeRemovedFromTitle.splice(index, 1);

        this.setState({moduleList: itemTobeRemovedFromModule});
        this.setState({title: itemTobeRemovedFromTitle});
    }

    setModuleTitle(event) {
        this.setState({
            module: {
                title: event.target.value
            }
        })
    }

    createModule() {
        var ccid = this.state.courseId;
        this.moduleService
            .createModule(this.state.courseId, this.state.module)
            .then((response) => {
                this.findAllModulesForCourse(ccid);
            });
    }


    findAllModulesForCourse(id) {
        console.log(this);
        this.courseService.findCourseById(id)
            .then((courses) => {
                /*this.setState({moduleList: courses.modules});*/
                this.setModuleList(courses.modules);
                console.log(courses);
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
                           value={this.state.module.title} onChange={this.setModuleTitle}/>
                        <i className="fa fa-plus-circle module-submit-btn" onClick={this.createModule}></i>
                </div>
                <SortableList items={this.state.title} onSortEnd={this.onSortEnd}
                              onRemove={(index) => this.deleteModule(index)}
                              click={(index) => this.generateLesson(index)}
                              lockAxis="y" axis="y"/>
            </div>)
    }
}

/*----------------------------------------------------------------------------------------------------------------*/

class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
        this.state = {
            courseId: '',
            courseTitle: '',
            moduleList: []
        };
        this.selectCourse = this.selectCourse.bind(this);
        this.setTitle = this.setTitle.bind(this);
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
        this.setTitle(this.props.match.params.courseId);
        $(function () {
            $('.module-menu, .module-content').css({height: $(window).innerHeight()});
            $(window).resize(function () {
                $('.module-menu, .module-content').css({height: $(window).innerHeight()});
            });
        });
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId);
        this.setTitle(newProps.match.params.courseId);
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    setTitle(courseId) {
        this.setState({courseId: courseId});
        this.courseService.findCourseById(courseId)
            .then((courses) => {
                this.setState({courseTitle: courses.title, moduleList: courses.modules});
                console.log(courses);
            });
    }

    render() {
        return (
            <div>
                <div className="root module-header">
                    <AppBar position="static" id="panelStyle">
                        <Toolbar>
                            <IconButton className="menuButton" color="inherit" aria-label="Menu">
                                <Link to={`/courses`} className="back-to-home-link">
                                    <Clear/>
                                </Link>
                            </IconButton>
                            <Typography variant="title" color="inherit">
                                {this.state.courseTitle}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className="row">
                    <SortableComponent moduleList={this.state.moduleList} courseId={this.state.courseId}/>
                    <div className="col-10 module-content">
                        <ModuleList courseId={this.state.courseId}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CourseEditor;