import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Slide, Counter } from './features/index';
import './App.css';
import { Step } from './models/Step';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  getByAmount, setSelected, getByAmountAsync, selectedCountries, setSelectedAsync,
} from './features/slide/SlideSlice';

function App() {
  const [steps, setSteps] = useState(5);
  const [slide, setSlide] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const countries = useSelector(selectedCountries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getByAmountAsync(steps))
  }, countries);

  const next = () => {
    if (slide + 1 == countries.length) {
      setShowResult(true);
      return;
    }
    setSlide(slide + 1);
  }

  const slides = countries.map((item: any, i) =>
    (<div key={i}>
      <Slide stepUpdated={(amount) => {

        dispatch(setSelectedAsync(i, item, amount));
        next();
      }} country={item} />
    </div>));
  const results = countries.map((item: any, i) =>
    (<div key={item.id}>
      <h1>{item.name}</h1>
      {item.isCorrect ? 'you got this one' : `wrong answer :`}
    </div>));

  if (countries.length == 0) {
    return (<div>Still loading countries</div>)
  }


  return (
    !showResult ?
      <AwesomeSlider
        selected={slide}
      >
        {slides}
      </AwesomeSlider> :
      <div>{results}</div>
  );
}

export default App;
