import React from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom'
import Layout from './view/layout/index'

function App() {
  return (
    <div className="App">
      <Router>
          <Route  component={Layout}></Route>
      </Router>
    </div>
  );
}

export default App;
