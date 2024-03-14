import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import App from './App'
import Apphome from './Apphome'
import LoginWrapper from './AppRe'



const AppNew = () => {

  useEffect(() => {
    const handlePopstate = () => {
      // Reload the page when navigating back or forward
      window.location.reload();
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      // Cleanup: remove the event listener when the component is unmounted
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);


  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginWrapper />
        </Route>
        <Route path="/:ctiy">
          <App />
        </Route>
        <Route path="/homedetails/:id">
          <Apphome />
        </Route>
      </Switch>
    </Router>


  );
}

export default AppNew;