'use client';
import React, { Suspense, useState } from 'react';
import { useHookstate } from '@hookstate/core';

import TextField from '@shared/inputs/TextField';
import { isValidEmail } from '@shared/inputs/EmailInput';
import styles from './RegisterPage.module.scss';
import { register } from '@shared/inputs/RegisterAnimated';
import { globalUserState } from '@shared/layouts/navigation/RegisterOrProfile';
import MaxWidth from '@shared/layouts/MaxWidth';
import Link from 'next/link';
import { globalSnackbarState } from '@shared/utils/Snackbar.js';
import PasswordInput from '@shared/inputs/PasswrodInput';
import { passwordRegex } from 'helpers/userHelper';
import SocialRegisterButtons from './SocialRegisterButtons';
import { deleteCookie, getCookie } from 'helpers/cookieHelper';
import { createCampaign } from 'app/(company)/run-for-office/components/RunCampaignButton';
import YellowButtonClient from '@shared/buttons/YellowButtonClient';
import { useRouter } from 'next/navigation';

// const SocialButtons = dynamic(() => import('./SocialButtons'), { ssr: false });

export const REGISTER_FIELDS = [
  {
    label: 'Full Name',
    key: 'name',
    type: 'text',
    required: true,
    helperText: '100 characters maximum',
  },
  {
    label: 'Email Address',
    key: 'email',
    type: 'email',
    required: true,
  },

  {
    label: 'Zip Code',
    key: 'zipcode',
    type: 'text',
    required: true,
  },
];

export const validateZip = (zip) => {
  // let zipInt = parseInt(zip);
  const validZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  return validZip.test(zip);
};

export default function RegisterPage({}) {
  const [score, setScore] = useState('good');
  const router = useRouter();
  const snackbarState = useHookstate(globalSnackbarState);

  const userState = useHookstate(globalUserState);

  const [state, setState] = useState({
    name: '',
    email: '',
    zipcode: '',
    password: '',
  });

  const enableSubmit = () => {
    return (
      state.name.length >= 2 &&
      state.name.length <= 100 &&
      validateZip(state.zipcode) &&
      validateEmail() &&
      state.password !== '' &&
      state.password.match(passwordRegex)
    );
  };

  const validateEmail = () => {
    return isValidEmail(state.email);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {
    if (enableSubmit()) {
      const user = await register({
        email: state.email,
        name: state.name,
        zip: state.zipcode,
        password: state.password,
      });

      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'register-form-success',
          label: 'register_form_submit',
        });
      }

      if (user.exists) {
        router.push('/login');
        snackbarState.set(() => {
          return {
            isOpen: true,
            message: 'An account already exists with this email. Please login',
            isError: true,
          };
        });
        return;
      }
      if (user) {
        userState.set(() => user);
        const afterAction = getCookie('afterAction');
        if (afterAction === 'createCampaign') {
          await createCampaign();
        } else {
          const returnUrl = getCookie('returnUrl');
          if (returnUrl) {
            deleteCookie('returnUrl');
            window.location.href = returnUrl;
          } else {
            window.location.href = '/';
          }
        }
        snackbarState.set(() => {
          return {
            isOpen: true,
            message: 'Welcome to Good Party!',
            isError: false,
          };
        });
      } else {
        snackbarState.set(() => {
          return {
            isOpen: true,
            message: 'Error registering your email',
            isError: true,
          };
        });
      }
    }
  };

  const onChangeField = (event, key) => {
    setState({
      ...state,
      [key]: event.target.value,
    });
  };

  const handleVerify = (token) => {
    if (token) {
      verifyRecaptchaCallback(token);
    }
  };

  const openLogin = () => {
    closeModalCallback();
    openLoginCallback();
  };

  return (
    <MaxWidth>
      <div className={` flex items-center justify-center ${styles.wrapper}`}>
        {score === 'bad' ? (
          <div className="py-6 max-w-lg">
            <div
              className="text-center"
              style={{ marginBottom: '32px', paddingTop: '32px' }}
            >
              <h1
                data-cy="register-title"
                className="text-3xl lg:text-4xl font-black"
              >
                Sign up for Good Party
              </h1>

              <br />
              <br />
              <div>
                Sorry, we can&apos;t create an account for you at the moment.
              </div>
            </div>
          </div>
        ) : (
          <div className="py-6 max-w-lg" style={{ width: '75vw' }}>
            <div className="text-center mb-8 pt-8">
              <h1
                data-cy="register-title"
                className="text-2xl lg:text-4xl font-black"
              >
                Sign up for Good Party
              </h1>
            </div>
            <div className="flex justify-center">
              <div
                className="mb-10 mt-6 flex rounded-xl bg-zinc-100 items-center justify-center"
                data-cy="register-label"
              >
                <div className="bg-black text-white py-3 px-6 rounded-xl">
                  Sign up
                </div>
                <Link
                  href="/login"
                  data-cy="redirect-to-login"
                  className=" no-underline"
                >
                  <div className="transition text-neutral-400 py-3 px-6 rounded-xl hover:text-black">
                    Sign In
                  </div>
                </Link>
              </div>
            </div>
            <form
              noValidate
              onSubmit={handleSubmitForm}
              data-cy="email-form"
              id="register-page-form"
            >
              {REGISTER_FIELDS.map((field) => (
                <div data-cy="register-field" key={field.key} className="mb-8">
                  <TextField
                    className={styles.textField}
                    value={state[field.key]}
                    label={field.label}
                    required={field.required}
                    size="medium"
                    fullWidth
                    type={field.type}
                    name={field.key}
                    variant="outlined"
                    onChange={(e) => onChangeField(e, field.key)}
                    helperText={field.helperText}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              ))}
              <PasswordInput
                value={state.password}
                onChangeCallback={(pwd) =>
                  onChangeField({ target: { value: pwd } }, 'password')
                }
                className={styles.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br />
              <br />

              <div>
                <YellowButtonClient
                  disabled={!enableSubmit()}
                  onClick={handleSubmit}
                  type="submit"
                  style={{ width: '100%' }}
                >
                  <strong>SIGN UP</strong>
                </YellowButtonClient>
              </div>
              {/* {!score && (
            <GoogleReCaptcha onVerify={handleVerify} action="REGISTER" />
          )} */}
            </form>
            <Suspense>
              <SocialRegisterButtons />
            </Suspense>
          </div>
        )}
      </div>
    </MaxWidth>
  );
}
