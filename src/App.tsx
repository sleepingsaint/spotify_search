import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Components/Login';
import RedirectedPage from './Components/RedirectedPage';
import SearchSongs from './Components/SearchSongs';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/redirect" component={RedirectedPage} />
        <Route path="/search" component={SearchSongs} />
      </Router>
    </div>
  )
}

export default App
