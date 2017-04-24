import React from 'react';
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import Popular from './Popular'
import Nav from './Nav'
import Home from './Home'
import Battle from './Battle'

class App extends React.Component {
  render () {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/popular' component={Popular} />
            <Route render={() =>  <p>Not Found T_T </p> } />
          </Switch>
        </div>
      </Router>

    )
  }
}

export default App;
