import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import generalStore from './store/reducer';
// import authStore from '../scenes/40_login/store/reducer';
// import mainViewStore from '../scenes/50_main_view/store/reducer';
// import simpleDiaryStore from '../scenes/60_simple_input_diary/store/reducer';
// import advancedDiaryStore from '../scenes/70_advanced_input_diary/store/reducer';

//list of all reducers for Redux
const appReducer = combineReducers({
    generalStore,
    // authStore,
    // mainViewStore,
    // simpleDiaryStore,
    // advancedDiaryStore,
    routing: routerReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_SUCCESS') {
        const {generalStore} = state;
        state = {generalStore};
    }
    return appReducer(state, action);
};


function configureStoreProd(initialState) {
    const middlewares = [
        // Add other middleware on this line...

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk,
    ];

    return createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
}

function configureStoreDev(initialState) {
    const logger = createLogger();
    const middlewares = [
        // Add other middleware on this line...

        // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
        reduxImmutableStateInvariant(),

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk,
        logger
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

    return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));
}

const reducers = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default reducers;
