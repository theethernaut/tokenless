import store from './main/store';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { Router, Route, IndexRoute } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppComponent from './main/components/AppComponent';
import PredictionComponent from './prediction/containers/PredictionComponent';
import CreatePredictionComponent from './market/containers/CreatePredictionComponent';
import MarketComponent from './market/containers/MarketComponent';
import AboutComponent from './about/components/AboutComponent';
import { connectNetwork } from './network/actions';
import {
  PATH_PREDICTION,
  PATH_CREATE,
  PATH_ABOUT, USE_CACHE
} from './constants';
import './styles/index.css';
import './styles/datetime.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

window.addEventListener('load', () => {

  // Initialize web3 and store in state.
  store.dispatch(connectNetwork());

  // UI entry point and routes.
  ReactDOM.render((
      <Provider store={store}>
        <Router history={syncHistoryWithStore(browserHistory, store)}>
          <Route path="/" component={AppComponent}>
            <IndexRoute component={MarketComponent}/>
            <Route path={PATH_CREATE} component={CreatePredictionComponent}/>
            <Route path={PATH_PREDICTION} component={PredictionComponent}/>
            <Route path={PATH_ABOUT} component={AboutComponent}/>
          </Route>
        </Router>
      </Provider>
    ),
    document.getElementById('root')
  );
});

// Clear cache?
if(!USE_CACHE) {
  window.localStorage.clear();
}