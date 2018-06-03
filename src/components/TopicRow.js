import React from 'react';
import {Link} from 'react-router-dom'
import '../css/CourseManager.style.client.css'

class TopicRow extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <tr>
                <td className="title-row">
                    <div className="row-div float-left">
                            {this.props.topic.title}
                    </div>
                </td>
            </tr>
        )
    }
}

export default TopicRow;