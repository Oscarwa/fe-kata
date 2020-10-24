import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import TransactionsPage from './components/TransactionsPage';
import { AppContext } from './lib/context';
import main from './lib/api-mock';

main();

const App = () => {
  const { user, setUser } = useContext(AppContext);

  const logout = () => {
    setUser(null);
  }

  return (
      <React.Fragment>
       
          <Router>
          <header style={ {width: "100%", height: "4rem", backgroundColor: "#c0c0c0", display: 'flex', alignItems: 'center' } }>
              <h1 >
                Company name
              </h1>
              { user && 
                <nav>
                  <div>
                    <div className="menu-item"><Link to="/home">Home</Link></div>
                    <div className="menu-item"><Link to="/transfers">Transfer</Link></div>
                  </div>
                  <div>
                    <div className="menu-item"><span onClick={ logout }>Log Out</span></div>
                  </div>
                </nav>
              }
          </header>
          <main className="content">
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/transfers" render={() => {
                return (user !== null ? <TransactionsPage /> : <Redirect to="/login" />);
              }}>
              </Route>
              <Route path="/home" render={() => {
                return (user !== null ? <HomePage /> : <Redirect to="/login" />);
              }}>
              </Route>
              <Route path="/" render={() => {
                return (user !== null ? <Redirect to="/home" /> : <Redirect to="/login" />);
              }}>
              </Route>
            </Switch>
          </main>
          </Router>
        <footer>

        </footer>
      </React.Fragment>
  );
}

export default App;
