import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Slide.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export function Slide(props: { stepUpdated: (amount: number) => any, country: any }) {
  return (
    <div>
      <div className={styles.col}>
        <span className={styles.value}>{props.country.name}</span>
        <Formik
          initialValues={{ temperature: '' }}
          validate={(values: { temperature: string; }) => {
            const errors: any = {};
            if (!values.temperature) {
              errors.temperature = 'Required';
            } else if (
              !/^[0-9\-]{1,3}$/i.test(values.temperature)
            ) {
              errors.temperature = `Invalid temperature, Please enter in celsius degree (-40 , 60) `;
            }
            return errors;
          }}
          onSubmit={(values: { temperature: string; }, { setSubmitting }: any) => {
            props.stepUpdated(parseInt(values.temperature));
          }}
        >
          {() => (
            <Form>
              <Field type="number" name="temperature" className={styles.textbox} />
              <ErrorMessage name="temperature" component="div" />
              <button type="submit" className={styles.button}>
                Bet temperature
            </button>
            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
}
