import React, {useState} from 'react';
import Search from './Search';
import History from './History'
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function App() {
  const addSearchHistory = (searchTerm) => {
    updateSearchHistory([...searchHistory, searchTerm ])
  }
  const [searchHistory, updateSearchHistory] = useState([])

  console.log({...searchHistory})
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/history">History</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/search">
            <Search addSearchHistory={addSearchHistory} />
          </Route>
          <Route path="/history">
            <History searchHistory={searchHistory} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Search Hacker News</h2>;
}
