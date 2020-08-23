import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Slide.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  getByAmount, setSelected, getByAmountAsync, selectedCountries, setSelectedAsync,
} from './GameSlice';
// import { Slide, AwesomeSlider } from '../index';
import 'react-awesome-slider/dist/styles.css';
import { AwesomeSlider, Slide } from '..';

export function Game(props: any) {
  const [steps, setSteps] = useState(5);
  const [slide, setSlide] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const countries = useSelector(selectedCountries);
  const dispatch = useDispatch();

  useEffect(()=>{
    if (countries.length == 0) {
      dispatch(getByAmountAsync(steps))
    }      
  });

  if (countries.length == 0) {
    return (<div>Still loading countries</div>)
  }

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
        debugger;
        dispatch(setSelectedAsync(i, item, amount));
        next();
      }} country={item} />
    </div>));

  const results = countries.map((item: any, i) =>
    (<div key={item.id}>
      <h1>{item.name}</h1>
      {item.isCorrect ? 'you got this one' : `wrong answer :`}
    </div>));

  return (
    !showResult ?
      <AwesomeSlider
        selected={slide}
        clickNext ={()=>{
          next();
        }}>
        {slides}
      </AwesomeSlider> :
      <div>{results}</div>
  );
}
