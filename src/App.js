import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Search from './Search';
import History from './History';

export default function App() {
  const addSearchHistory = (searchTerm) => {
    if (!searchHistory.includes(searchTerm)) {
      updateSearchHistory([...searchHistory, searchTerm]);
    }
  };
  const [searchHistory, updateSearchHistory] = useState([]);
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
