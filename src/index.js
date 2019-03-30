import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.css';
import App from 'App';
import * as serviceWorker from 'serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

serviceWorker.unregister();
