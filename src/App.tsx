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
  return (<Game />);
}

export default App;
