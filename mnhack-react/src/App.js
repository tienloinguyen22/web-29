import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateGameScreen from './pages/CreateGameScreen';
import GameInfoScreen from './pages/GameInfoScreen';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path='/' component={CreateGameScreen} />
        <Route path='/games/:gameId' component={GameInfoScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
