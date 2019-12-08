import toastr from 'toastr';
import ajax from './store/ajax';
import { beginAjaxCall, endAjaxCall } from './store/api';

function showNoGenericLoading(props = {}) {
    let showNoGenericLoading = false;
    if (props.showNoGenericLoading) {
        showNoGenericLoading = props.showNoGenericLoading;
    }
    return showNoGenericLoading;
}

export default class Rest {
    static get(url, data, dispatch, callback, props) {
        let promise = ajax.get(url, data, dispatch, props);
        return Rest._promiseMiddleware(promise, dispatch, callback, props, url);
    }
    static put(url, data, dispatch, callback, props) {
        let promise = ajax.put(url, data, dispatch, props);
        return Rest._promiseMiddleware(promise, dispatch, callback, props, url);
    }
    static post(url, data, dispatch, callback, props) {
        let promise = ajax.post(url, data, dispatch, props);
        return Rest._promiseMiddleware(promise, dispatch, callback, props, url);
    }
    static delete(url, data, dispatch, callback, props) {
        let promise = ajax.delete(url, data, dispatch, props);
        return Rest._promiseMiddleware(promise, dispatch, callback, props, url);
    }

    static _promiseMiddleware(promise, dispatch, callback, props, url) {
        // let msDelay = 1000;
        let msDelay = 0;
        // promise.then(this.mockDelay(msDelay)).then(response => {
        promise.then(response => {
            if(callback) {
                dispatch(callback(response) || {type: "NA"});
            }
            dispatch(endAjaxCall(showNoGenericLoading(props)));
        })
            .catch(error => {
                // dispatch(endAjaxCall(showNoGenericLoading(props)));
                let statusCode = error.response && error.response.status;
                if (ajax.isLogoutCode(statusCode))
                    ;//if it is log out code user will be logged out in interceptor
                else if (error.response && error.response.status === 400)
                    toastr.error(error.response.data.message || "Input error, could not complete the request");
                else if(!ajax.isConnectionError(statusCode))
                    toastr.error(url + " " + error);
            });
        dispatch(beginAjaxCall(showNoGenericLoading(props)));
        return promise;
    }

    //in case we would like to delay response to see how app is behaving
    static mockDelay(ms) {
        return (x) => new Promise(resolve => setTimeout(() => resolve(x), ms));
    }
}


