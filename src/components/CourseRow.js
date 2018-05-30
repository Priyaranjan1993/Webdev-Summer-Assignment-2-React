import React from 'react';
import {Link} from 'react-router-dom'
import '../css/CourseManager.style.client.css'
import $ from 'jquery'

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
                <div className="row-div float-left">
                    <Link to={`/course/${this.props.course.id}/edit`} className="table-data-width">
                        {this.props.course.title}
                    </Link>
                </div>
               </td>
               <td className="date-row">
                <div className="row-div float-left">
                    <Link to={`/course/${this.props.course.id}/edit`} className="table-data-width">
                        {this.props.course.title}
                    </Link>
                </div>
               </td>
               <td className="time-row">
                <div className="row-div float-left">
                    <Link to={`/course/${this.props.course.id}/edit`} className="table-data-width">
                        {this.props.course.title}
                    </Link>
                </div>
               </td>
           </tr>
        )
    }
}

export default CourseRow;