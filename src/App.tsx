import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Step } from './models/Step';
import { useSelector, useDispatch } from 'react-redux';
import {
  getByAmount, setSelected, getByAmountAsync, selectedCountries, setSelectedAsync,
} from './features/game/GameSlice';
import { Game } from './features';

function App() {
  return (<div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Game />
  </div>
  );
}

export default App;
