import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import {syncHistoryWithStore} from 'react-router-redux';
import {createBrowserHistory} from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducers from './reducers';
import Loader from './components/Loader'
import Dashboard from '../scenes/dashboard/Dashboard';

const store = reducers();
const history = syncHistoryWithStore(createBrowserHistory(), store);

class App extends Component {

    render () {
        return (
            <MuiThemeProvider>
                <HashRouter basename='/'>
                    <Provider
                        history={history}
                        store={store}
                    >
                        <main>
                            <Switch>
                                <Route
                                    exact
                                    path='/'
                                    render={() => <Redirect to='/dashboard' />}
                                />
                                <Route
                                    exact
                                    path='/dashboard'
                                    component={Dashboard}
                                />
                            </Switch>
                            <Loader />
                        </main>
                    </Provider>
                </HashRouter>
            </MuiThemeProvider>
        );
    }
}

export default App;