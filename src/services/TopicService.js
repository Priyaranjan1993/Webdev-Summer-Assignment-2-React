let _singleton = Symbol();
/*const TOPIC_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/course/module/lesson/topic';*/

const TOPIC_API_URL = 'http://localhost:8080/api/course/module/lesson/topic';

export default class TopicService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TopicService(_singleton);
        return this[_singleton]
    }

    createTopic(lessonId,topic) {
        return fetch(TOPIC_API_URL + '/' + lessonId,
            {
                body: JSON.stringify(topic),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }


    findAllTopicsForLesson(lessonId) {
        if(lessonId!='' && lessonId!=undefined)
        {
            return fetch(TOPIC_API_URL + '/' + lessonId)
                .then(function (response) {
                    return response.json();
                })
        }

    }


}


