let _singleton = Symbol();
const LESSON_API_URL = 'http://localhost:8080/api/course/module/lesson';

export default class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }


    findAllLessonsForModule(courseId,moduleId) {
        if(courseId!='' && courseId!=undefined && moduleId!='' && courseId!=undefined)
        {
            return fetch(LESSON_API_URL + '/' + courseId+ '/' + moduleId)
                .then(function (response) {
                    return response.json();
                })
        }

    }

    createLesson(courseId,moduleId,lesson) {
        return fetch(LESSON_API_URL + '/' + courseId+ '/' + moduleId,
            {
                body: JSON.stringify(lesson),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }

    deleteLesson(lessonId) {
        return fetch(LESSON_API_URL + '/' + lessonId,
            {
                method: 'DELETE'
            }).then(function (response) {
            return response;
        })
    }

}


