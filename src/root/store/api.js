import actions from './actions';

//TODO: dispatch(beginAjaxCall()); should be moved to centrolized place like mockAPI
//but note in case you have optamistic api call (not waiting for reply) int that case
//you may not want to dispatch beginAjaxCall

export function setRedirectUrl(url) {
    return {
        type: actions.SET_REDIRECT_URL,
        url
    };
}

export function beginAjaxCall(showNoLoading) {
    return {
        type: actions.BEGIN_AJAX_CALL,
        showLoading: !showNoLoading
    };

}
export function endAjaxCall(showNoLoading) {
    return {
        type: actions.END_AJAX_CALL,
        showLoading: !showNoLoading
    };
}

export function ajaxCallError(error) {
    return {
        type: actions.AJAX_CALL_ERROR,
        error
    };
}

export function internalLoadingStart() {
    return function (dispatch) {
        dispatch({
            type: actions.BEGIN_INTERNAL_LOADING
        })
    }
}
export function internalLoadingEnd() {
    return function (dispatch) {
        dispatch({
            type: actions.END_INTERNAL_LOADING
        })
    }
}

