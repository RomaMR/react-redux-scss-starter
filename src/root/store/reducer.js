import actions from './actions';

const initialState = {
    redirectUrl: "/",
    numAjaxCallsInProgress: 0,
    numShouldLoadCallsInProgress: 0,
    //some internal calculation or similar:
    internalLoadingsInProgress: 0
};

const generalStore = (state = initialState, action) => {
    let nbrAjaxCalls;
    let nbrShouldLoadCalls;
    switch (action.type) {
        case actions.SET_REDIRECT_URL:
            return {
                ...state,
                redirectUrl: action.url
            };
            
        case actions.BEGIN_INTERNAL_LOADING:
            return {
                ...state,
                internalLoadingsInProgress: state.internalLoadingsInProgress + 1
            };
            
        case actions.END_INTERNAL_LOADING:
            return {
                ...state,
                internalLoadingsInProgress: state.internalLoadingsInProgress - 1
            };
            
        case actions.BEGIN_AJAX_CALL:
            nbrAjaxCalls = state.numAjaxCallsInProgress + 1;
            nbrShouldLoadCalls = state.numShouldLoadCallsInProgress;
            if (action.showLoading) {
                nbrShouldLoadCalls++;
            }
            return {
                ...state,
                numAjaxCallsInProgress: nbrAjaxCalls,
                numShouldLoadCallsInProgress: nbrShouldLoadCalls
            };
            
        case actions.END_AJAX_CALL:
            nbrAjaxCalls = state.numAjaxCallsInProgress - 1;
            nbrShouldLoadCalls = state.numShouldLoadCallsInProgress;
            if (action.showLoading) {
                nbrShouldLoadCalls--;
            }
            return {
                ...state,
                numAjaxCallsInProgress: nbrAjaxCalls,
                numShouldLoadCallsInProgress: nbrShouldLoadCalls
            };

        default:
            return state;
    }
};

export default generalStore;
