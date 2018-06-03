import React from 'react';
import CourseList from './CourseList';
import CourseEditor from '../containers/CourseEditor'
import '../css/CourseManager.style.client.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import $ from 'jquery'
import ModuleEditor from "./modules/ModuleEditor";

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
};


class CourseManager extends React.Component {

    componentDidMount() {
        console.log("message");
        console.log("width -"+ $(window).width());
        console.log("width -"+ $(window).height());
    }


    render() {
        return (
            <div>
                <div className="content">
                    <Router>
                        <div>
                            <Route path="/courses" component={CourseList}>
                            </Route>
                            <Route path="/course/:courseId/edit" component={CourseEditor}>
                            </Route>
                            {/*<Route path="/course/module/lesson/:cid" component={ModuleEditor}>
                            </Route>*/}
                        </div>
                    </Router>
                </div>
            </div>
        )
    }
}

/*CourseManager.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseManager);*/

export default CourseManager;