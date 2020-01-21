import React from "react";
import LandingScreen from "./components/LandingScreen/LandingScreen";
import { Route, Switch } from "react-router-dom";
import Error from "./components/Error/Error";
import GameScreen from "./components/GameScreen/GameScreen";
import ResultScreen from "./components/ResultScreen/ResultScreen";

function App() {
  return (
    <main className="App">
      <Switch>
        <Route path="/" component={LandingScreen} exact />
        <Route path="/game" component={GameScreen} />
        <Route path="/results" component={ResultScreen} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
