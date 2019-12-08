import axios from 'axios';
import Toastr from 'toastr';
import platform from 'platform';


let s_axios = axios.create({
    // TODO cordova will need the full server url here
    // should be injected during build time on the build server
    //baseURL: 'http://34.247.145.213:8083/api/v1',
    baseURL: '/api/v1',
    headers: {
        'client-platform': platform.toString(),
        // 'Content-Type': 'application/json; charset=UTF-8',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        // 'Data-Type': 'json',
        // 'Accept': 'application/json, text/javascript, */*; q=0.01',
        // 'X-Requested-With': 'XMLHttpRequest'
    }
});
// delete s_axios.defaults.headers.common['X-XSRF-TOKEN'];

let dispatchLoggedOutCallback = {};

export function injectLoggedOutSuccessDispatcher(dispatch, loggedOutCallback) {
    dispatchLoggedOutCallback = { dispatch: dispatch, callback: loggedOutCallback };
}

class Ajax {

    static _axios() {
        //https://github.com/mzabriskie/axios/
        //https://github.com/ctimmerm/axios-mock-adapter
        // if (singletonCreated === true)
        //     return s_axios;

        // if (conf.mock) {
        //     var init = require('./mock/InitMocker.js');
        //     init(s_axios, conf.mock_delay);
        // }
        this.requestInterceptor(s_axios);
        this.responseInterceptor(s_axios);
        return s_axios;
    }

    static get(uri, data) {
        return this._axios().get(uri, data);
    }

    static put(uri, data) {
        return this._axios().put(uri, data);
    }
    static post(uri, data) {
        return this._axios().post(uri, data);
    }
    static delete(uri) {
        return this._axios().delete(uri);
    }

    static isLogoutCode(code) {
        //401: Unauthorized adn 403: Forbidden will log out user
        return (code === 401 || code === 403 || this.isConnectionError(code));
    }

    static isConnectionError(code) {
        return (code > 501);
    }

    static requestInterceptor(axios) {
        // Add a request interceptor
        axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            //console.log('Starting Request ' + config.url.split('v1')[1], config);
            var token = window.localStorage.getItem('auth-token');
            if (token) {
                // config.headers['x-auth-token'] = token;
            }
            //high for debugging on server side..
            config.timeout = 100000;//default is 1000
            return config;
        }, function (error) {
            console.error(error);
            // Do something with request error
            return Promise.reject(error);
        });
    }

    static responseInterceptor(axios) {
        //the same respose interceptor was called more than once
        //WA to create reqestId:
        let requestId = Math.floor(Math.random() * 1000000000);

        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
            // Do something with response data
            //...
            requestId = null;
            return response;
        }, function (error) {
            if(requestId !== null) {
                // Do something with response error
                //console.error(error);
                let statusCode = error.response.status;
                if (Ajax.isLogoutCode(statusCode)) {
                    if (window.localStorage.getItem('auth-token'))
                        Toastr.error("Missing authorization, logged out..");
                    window.localStorage.removeItem('auth-token');
                    if (dispatchLoggedOutCallback.dispatch) {
                        dispatchLoggedOutCallback.dispatch(dispatchLoggedOutCallback.callback());
                    }
                }
                if (Ajax.isConnectionError(statusCode))
                    Toastr.error("The server is down or there is a connection issue, check your internet connection...");
            }
            requestId = null;
            return Promise.reject(error);
        });
    }

}


export default Ajax;
