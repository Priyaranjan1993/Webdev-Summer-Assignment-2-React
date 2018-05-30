import React from 'react'
import {Link} from 'react-router-dom'

export default class ModuleListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    deleteModule(moduleId) {
        this.moduleService
            .deleteModule(moduleId)
            .then(() => {
                this.findAllModulesForCourse
                (this.state.courseId)
            });
    }

    render() {
        return (
            <li><Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                {this.props.module.title}
            </Link>
                <button onClick={() => {
                    this.props.delete(this.props.module.id)
                }}>
                    DELETE
                </button>
            </li>
        )
    }
}