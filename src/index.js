import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import getWeb3 from './util/web3/getWeb3';

// Layouts
import App from './App';
import Home from './components/Home';
import MarketContainer from './components/MarketContainer';

// Redux Store
import store from './store';

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!');
})
.catch((error) => {
  console.log('Error in web3 initialization: ', error);
});

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="market/:address" component={MarketContainer}/>
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
