let _singleton = Symbol();
const MODULE_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/course/COURSE_ID/module';
const MODULEID_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/module/MODULE_ID';
const MODUL_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/module';

export default class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }

    createModule(courseId, modules) {
        return fetch(MODULE_API_URL.replace('COURSE_ID', courseId),
            {
                body: JSON.stringify(modules),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(function (response) {
                return response.json();
            })
    }

    findAllModulesForCourse(courseId) {
        return fetch(
            MODULE_API_URL
                .replace('COURSE_ID', courseId))
            .then(function (response) {
                return response.json();
            })
    }

    deleteModule(moduleId) {
        return fetch(MODUL_API_URL+ '/' + moduleId,
            {
                method: 'DELETE'
            }).then(function (response) {
                return response;
            })
    }
}


