import React, { Component } from "react";
import "./App.css";
import PieChart from "./components/graph/PieChart";
import BarChart from "./components/graph/BarChart";
import LineChart from "./components/graph/LineChart";
import TimeChart from "./components/graph/TimeChart";
import Home from "./components/home";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

//Material Imports
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import { chartItems } from "./components/graph/items";
import List from "@material-ui/core/List";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <AppBar position="absolute" />
            <Drawer variant="permanent">
              <div />
              <List>{chartItems}</List>
            </Drawer>
            <main>
              <Switch>
                <Redirect from="/" to="/home" />
                <Route path="/home" component={Home} />
              </Switch>
              <Route path="/home" component={Home} />
              <Route path="/pie" component={PieChart} />
              <Route path="/bar" component={BarChart} />
              <Route path="/line" component={LineChart} />
              <Route path="/time" component={TimeChart} />
            </main>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
