'use client';

import React, { useState, useContext } from 'react';
import gpApi from '/gpApi';
import gpFetch from '/gpApi/gpFetch';
import { setUserCookie, setCookie } from '/helpers/cookieHelper';

import { isValidEmail } from './EmailInput1';
import YellowButtonClient from '../buttons/YellowButtonClient';
import styles from './RegisterAnimated.module.scss';

const fields = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
  },
  {
    name: 'name',
    type: 'text',
    placeholder: 'Name',
  },
  {
    name: 'zip',
    type: 'text',
    placeholder: 'Zip',
  },
];

async function register(payload) {
  try {
    const { user, token } = await gpFetch(gpApi.entrance.register, payload);
    setUserCookie(user);
    setCookie('token', token);

    return true;
  } catch (e) {
    console.log('error', e);
    return false;
  }
}

export default function RegisterAnimated({ afterRegisterCallback }) {
  const [isActive, setIsActive] = useState(false);
  const [state, setState] = useState({
    email: '',
    name: '',
    zip: '',
  });

  const onChangeField = (key, val) => {
    const newState = {
      ...state,
      [key]: val,
    };
    setState(newState);
  };

  const canSubmit = () =>
    isValidEmail(state.email) &&
    state.name.length > 1 &&
    state.zip.length === 5;

  const submitForm = async () => {
    const res = await register({
      email: state.email,
      name: state.name,
      zip: state.zip,
    });
    if (res) {
      setState({
        email: '',
        name: '',
        zip: '',
      });
      if (afterRegisterCallback) {
        afterRegisterCallback();
      }
    } else {
    }
  };

  return (
    <div>
      <form
        noValidate
        onSubmit={(e) => e.preventDefault()}
        id="register-combo-form"
      >
        <div className="lg:flex lg:items-center">
          <div className="lg:w-full lg:overflow-hidden">
            <div className={`${styles.inner} ${isActive && 'active'}`}>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {fields.map((field) => (
                  <div key={field.name}>
                    <input
                      name={field.name}
                      type={field.type}
                      id={`register-${field.name}`}
                      placeholder={field.placeholder}
                      value={state[field.name]}
                      onBlur={() => setIsActive(false)}
                      onFocus={() => setIsActive(true)}
                      onChange={(e) =>
                        onChangeField(field.name, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 lg:mt-0">
            <YellowButtonClient
              type="submit"
              disabled={!canSubmit()}
              onClick={submitForm}
              style={{ borderRadius: '0 4px 4px 0' }}
            >
              <div style={{ whiteSpace: 'nowrap' }}>JOIN US</div>
            </YellowButtonClient>
          </div>
        </div>
      </form>
    </div>
  );
}