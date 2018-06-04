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
            moduleId:''
        };
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
      /*  let object = {};*/
        var results = this.state.moduleList.filter(function(module) {
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

    generateLesson(index) {
        var arr = this.state.moduleList.filter(function(module) {
            return module.title.indexOf(index) > -1;
        });
        this.setState({moduleId: arr[0].id});
        console.log(this.state);
        this.props.handlerFromParant(arr[0].id);
    }

    removeModule() {
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