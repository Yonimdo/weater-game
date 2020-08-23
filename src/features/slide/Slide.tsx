import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Slide.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export function Slide(props: { stepUpdated: (amount: number) => any, country: any }) {
  return (
    <div>
      <div className={styles.row}>
        <span className={styles.value}>{props.country.name}</span>
      </div>
      <div className={styles.row}>
        <Formik
          initialValues={{ tempature: '' }}
          validate={values => {
            const errors: any = {};
            if (!values.tempature) {
              errors.tempature = 'Required';
            } else if (
              !/^[0-9\-]{1,2}$/i.test(values.tempature)
            ) {
              errors.tempature = `Invalid tempature, Please enter in celsius degree for ${props.country.name}`;
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            debugger;
            props.stepUpdated(parseInt(values.tempature));
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="number" name="tempature"  className={styles.textbox}  />
              <ErrorMessage name="tempature" component="div" />
              <button type="submit" className={styles.button} disabled={isSubmitting}>
                Bet Tempature
           </button>
            </Form>
          )}
        </Formik>


        {/* <input
          className={styles.textbox}
          aria-label="Set your bet tempature in state"
          value={tempatureAmount}
          onChange={e => setTempatureAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => props.stepUpdated(parseInt(tempatureAmount))}>
          Bet Weather
        </button> */}
      </div>
    </div>
  );
}
