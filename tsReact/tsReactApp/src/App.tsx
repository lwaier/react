import React from 'react';
import {Route,HashRouter as Router} from 'react-router-dom';
import Layout from './view/index'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route component={Layout}></Route>
      </Router>
    </div> 
  );
}

export default App;
