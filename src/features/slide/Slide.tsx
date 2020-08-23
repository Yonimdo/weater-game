import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getByAmount, getByAmountAsync, selectedCountries,
} from './SlideSlice';
import styles from './Slide.module.css';

export function Slide(props: { stepUpdated: (amount: number) => any, country: any }) {

  const [tempatureAmount, setTempatureAmount] = useState(props.country.userTempatureValue);

  return (
    <div>
      <div className={styles.row}>
        <span className={styles.value}>{props.country.name}</span>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set your bet tempature in state"
          value={tempatureAmount}
          onChange={e => setTempatureAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => props.stepUpdated(parseInt(tempatureAmount))}>
          Bet Weather
        </button>
      </div>
    </div>
  );
}
