import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import EurUsd5Min from "./Components/EurUsd/5min/5min";
import EurUsd15Min from "./Components/EurUsd/15min/15min";
import EurUsd30Min from "./Components/EurUsd/30min/30min";
import EurUsd60Min from "./Components/EurUsd/60min/60min";
import EurUsdDaily from "./Components/EurUsd/Daily/Daily";
import EurUsdWeekly from "./Components/EurUsd/Weekly/Weekly";
import EurUsdMonthly from "./Components/EurUsd/Monthly/Monthly";

// import "./App.css";

class App extends Component {
  render() {
    // a = [];

    return (
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to="/eurusd5min">EurUsd 5Min</Link>
            </li>
            <li>
              <Link to="/eurusd15min">EurUsd 15Min</Link>
            </li>
            <li>
              <Link to="/eurusd30min">EurUsd 30Min</Link>
            </li>
            <li>
              <Link to="/eurusd60min">EurUsd 60Min</Link>
            </li>
            <li>
              <Link to="/eurusdDaily">EurUsd Daily</Link>
            </li>
            <li>
              <Link to="/eurusdWeekly">EurUsd Weekly</Link>
            </li>
            <li>
              <Link to="/eurusdMonthly">EurUsd Monthly</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>

          <hr />

          <Route path="/eurusd5min" component={EurUsd5Min} />
          <Route path="/eurusd15min" component={EurUsd15Min} />
          <Route path="/eurusd30min" component={EurUsd30Min} />
          <Route path="/eurusd60min" component={EurUsd60Min} />
          <Route path="/eurusdDaily" component={EurUsdDaily} />
          <Route path="/eurusdWeekly" component={EurUsdWeekly} />
          <Route path="/eurusdMonthly" component={EurUsdMonthly} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
