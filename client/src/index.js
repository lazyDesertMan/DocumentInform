import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import User from './classes/User';
import 'bootstrap/dist/css/bootstrap.min.css'


export const Context = createContext(null);
ReactDOM.render(
  <Context.Provider value={{
    user: new User(),
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);
