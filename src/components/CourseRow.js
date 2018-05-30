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
               {/* <td>{this.props.course.title}</td>*/}
                <td>
                    <Link to= {`/course/${this.props.course.id}/edit`}>
                        {this.props.course.title}
                    </Link>
                </td>
            </tr>
        )
    }
}

export default CourseRow;