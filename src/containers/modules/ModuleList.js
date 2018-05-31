import React from 'react'
import ModuleService from '../../services/ModuleService'
import ModuleListItem from '../../components/ModuleListItem'
import ModuleEditor from './ModuleEditor'
import {BrowserRouter as Router,Route} from 'react-router-dom'


export default class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {courseId: '', module: {title: ''}, modules: []};
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.renderModules = this.renderModules.bind(this);
        this.moduleService = ModuleService.instance;
    }

    componentWillReceiveProps(newProps) {
        this.findAllModulesForCourse(newProps.courseId);
        this.setCourseId(newProps.courseId)
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {
                this.setModules(modules)
            });
    }

    setModules(modules) {
        this.setState({modules: modules})
    }

    renderModules() {
        let modules = this.state.modules.map((module) => {
            return (<ModuleListItem key={module.id} module={module} delete={this.deleteModule}/>)
        });
        return (
            <ul>{modules}</ul>
        )
    }

    deleteModule(moduleId) {
        console.log(moduleId);
    }

    createModule() {
        this.moduleService
            .createModule(
                this.state.courseId,
                this.state.module)
            .then(() => {
                this.findAllModulesForCourse
                (this.state.courseId);
            });
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }


    setModuleTitle(event) {
        this.setState({
            module: {
                title: event.target.value
            }
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-4">
                    <h4>Module List for courseId:
                        {this.state.courseId}</h4>
                    <input placeholder="New Module" value={this.state.module.title} onChange={this.setModuleTitle}/>
                    <button onClick={this.createModule}>Create</button>
                    {this.renderModules()}
                </div>
                <div className="col-8">
                    <Route path="/course/:courseId/module/:moduleId" component={ModuleEditor}/>
                </div>
            </div>
        )
    }
}