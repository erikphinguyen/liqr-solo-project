import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// -----> error: Module not found: Error: Can't resolve './components/LoginFormPage' in '/home/erikphinguyen/appacademy/liqr-solo-project/frontend/src'
function App() {
  return (
    <Switch>
      <h1>Hello World!</h1>
      <Route path="/login">
        {/* <LoginFormPage /> */}
      </Route>
    </Switch>
  );
}

export default App;
