import React, { Component } from 'react';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './store';
import AddPassword from './components/AddPassword';
import PasswordTable from './components/PasswordTable';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div>
            <AddPassword/>
            <PasswordTable/>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
