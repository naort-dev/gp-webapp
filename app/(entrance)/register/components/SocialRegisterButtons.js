'use client';
import gpApi from 'gpApi';
import gpFetch from 'gpApi/gpFetch';
import {
  deleteCookie,
  getCookie,
  setCookie,
  setUserCookie,
} from 'helpers/cookieHelper';
import { useHookstate } from '@hookstate/core';
import { globalSnackbarState } from '@shared/utils/Snackbar.js';
import { useRouter } from 'next/navigation';
import { globalUserState } from '@shared/layouts/navigation/RegisterOrProfile';
import TwitterButton from 'app/(entrance)/login/components/TwitterButton';
import { createCampaign } from 'app/(company)/run-for-office/components/RunCampaignButton';
import GoogleRegisterButton from './GoogleRegisterButton';
import { GoogleOAuthProvider } from '@react-oauth/google';
import FacebookRegisterButton from './FacebookRegisterButton';

async function register(payload) {
  try {
    const api = gpApi.entrance.register;
    const { user, token } = await gpFetch(api, payload);
    if (user && token) {
      setUserCookie(user);
      setCookie('token', token);
    }

    return user;
  } catch (e) {
    console.log('error', e);
    return false;
  }
}

export default function SocialRegisterButtons() {
  const snackbarState = useHookstate(globalSnackbarState);
  const userState = useHookstate(globalUserState);
  const router = useRouter();

  const socialRegisterCallback = async (socialUser) => {
    const profile = socialUser._profile;
    const provider = socialUser._provider;
    const { name, email, id, profilePicURL } = profile;
    // for facebook - get a larger image
    let socialPic = profilePicURL;
    let idToken;
    if (provider === 'facebook') {
      try {
        idToken = socialUser._token.accessToken;
      } catch (e) {
        console.log('fb API error');
      }
    } else if (provider === 'google') {
      // for gogole removing the "=s96-c" at the end of the string returns a large image.
      try {
        const largeImg = profilePicURL.substring(0, profilePicURL.indexOf('='));
        if (largeImg) {
          socialPic = largeImg;
        }
        ({ idToken } = socialUser._token);
      } catch (e) {
        console.log('large image error');
      }
    }

    const payload = {
      socialId: id,
      socialProvider: provider,
      socialPic,
      name,
      email,
      socialToken: idToken,
      source: 'registerPage',
      uri: window?.location.href,
    };
    const user = await register(payload);
    if (user) {
      userState.set(() => user);

      const afterAction = getCookie('afterAction');
      if (afterAction === 'createCampaign') {
        await createCampaign(router);
      } else {
        const returnUrl = getCookie('returnUrl');
        if (returnUrl) {
          deleteCookie('returnUrl');
          router.push(returnUrl);
        } else {
          router.push('/');
        }
      }

      snackbarState.set(() => {
        return {
          isOpen: true,
          message: 'Welcome to Good Party!',
          isError: false,
        };
      });

      window.location.href = '/';
    } else {
      snackbarState.set(() => {
        return {
          isOpen: true,
          message: 'Error registering',
          isError: true,
        };
      });
    }
  };
  const socialRegisterFailureCallback = () => {};
  return (
    <>
      <div className="my-8 h-4 relative">
        <div className="border-b border-neutral-200 h-4" />
        <div
          className="absolute w-12 text-center top-1 bg-white text-neutral-500"
          style={{ left: 'calc(50% - 24px)' }}
        >
          Or
        </div>
      </div>

      <GoogleOAuthProvider clientId="28351607421-c9m6ig3vmto6hpke4g96ukgfl3vvko7g.apps.googleusercontent.com">
        <GoogleRegisterButton loginSuccessCallback={socialRegisterCallback} />
      </GoogleOAuthProvider>

      <FacebookRegisterButton loginSuccessCallback={socialRegisterCallback} />

      <div data-cy="twitter-register" className="mt-6">
        <TwitterButton />
      </div>
    </>
  );
}
