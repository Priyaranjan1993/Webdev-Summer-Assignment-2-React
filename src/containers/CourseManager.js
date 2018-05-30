import React from 'react';
import CourseList from './CourseList';
import CourseEditor from '../containers/CourseEditor'
import '../css/CourseManager.style.client.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import $ from 'jquery'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
                <div className="root">
                    <AppBar position="static" id="panelStyle">
                        <Toolbar>
                            <IconButton className="menuButton" color="inherit" aria-label="Menu">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="title" color="inherit">
                                Course Manager
                            </Typography>
                            <div className="form-group customBox">
                                <input type="text" className="form-control panelTextbox" id="usr"
                                       placeholder="New Course Title"/>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className="table-Header" data-spy="affix" data-offset-top="197">
                    <div className="float-left title-Width">Title</div>
                    <div className="float-left owner-Width">Owner</div>
                    <div className="float-left d-last-modified-Width">Date Last Modified</div>
                    <div className="float-left t-last-modified-Width">Time Last Modified</div>
                </div>
                <div>
                    <Router>
                        <div className="container-fluid">
                            <h1>Course Manager</h1>
                            <Route path="/courses" component={CourseList}>
                            </Route>
                            <Route path="/course/:courseId/edit" component={CourseEditor}>
                            </Route>
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