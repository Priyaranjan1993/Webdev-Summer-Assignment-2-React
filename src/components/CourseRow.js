import React from 'react';
import {Link} from 'react-router-dom'
import '../css/CourseManager.style.client.css'

class CourseRow extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <tr>
                <td className="title-row">
                    <div className="row-div float-left">
                        <Link to={`/course/${this.props.course.id}/edit`} className="table-data-width">
                            {this.props.course.title}
                        </Link>
                    </div>
                </td>
                <td className="owner-row">
                    <div className="row-div ">
                        <span className="owner-div">me</span>
                    </div>
                </td>
                <td className="date-row">
                    <div className="row-div">
                        {this.props.course.modified}
                    </div>
                </td>
                <td className="time-row">
                    <div className="row-div" onClick={() => {this.props.delete(this.props.course.id)}}>
                        <i className="fa fa-minus-circle delete-icon action-div"></i>
                    </div>
                </td>
            </tr>
        )
    }
}

export default CourseRow;