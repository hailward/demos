import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Index from '../views/Index/index'
import Home from '../views/Home/index'

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={Index}></Route>
          <Route exact path="/home" component={Home}></Route>
        </Fragment>
      </Router>
    )
  }
}

export default AppRouter;