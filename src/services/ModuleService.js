let _singleton = Symbol();
const MODULE_API_URL = 'http://localhost:8080/api/course/COURSE_ID/module';
const MODULEID_API_URL = 'http://localhost:8080/api/module/MODULE_ID';

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
        return fetch(MODULEID_API_URL.replace('CID', courseId),
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
        return fetch(MODULE_API_URL.replace
        ('MODULE_ID', moduleId), {
            method: 'delete'
        })
    }
}

