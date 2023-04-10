'use client';
import PurpleButton from '@shared/buttons/PurpleButton';
import YellowButton from '@shared/buttons/YellowButton';
import YellowButtonClient from '@shared/buttons/YellowButtonClient';
import gpApi from 'gpApi';
import gpFetch from 'gpApi/gpFetch';
import { deleteCookie, getUserCookie, setCookie } from 'helpers/cookieHelper';
import { useRouter } from 'next/navigation';

export async function fetchUserCampaign() {
  try {
    const api = gpApi.campaign.onboarding.findByUser;
    return await gpFetch(api, false, 1);
  } catch (e) {
    console.log('error', e);
    return false;
  }
}

export async function createCampaign(router) {
  try {
    const api = gpApi.campaign.onboarding.create;
    const { slug } = await gpFetch(api);
    if (slug) {
      router.push(`/onboarding/${slug}/dashboard`);
      deleteCookie('afterAction');
      deleteCookie('returnUrl');
    }
  } catch (e) {
    console.log('error', e);
    return false;
  }
}

export default function RunCampaignButton() {
  const router = useRouter();
  const handleRun = async () => {
    const user = getUserCookie(true);
    if (!user) {
      setCookie('afterAction', 'createCampaign');
      router.push('/register');
    } else {
      const { campaign } = await fetchUserCampaign();
      if (campaign?.slug) {
        router.push(`/onboarding/${campaign.slug}/dashboard`);
      } else {
        await createCampaign(router);
      }
    }
  };
  return (
    <div className="relative z-10" onClick={handleRun}>
      <YellowButton style={{ width: '100%' }}>
        <div className="whitespace-nowrap font-black text-xl tracking-wide">
          GET STARTED
        </div>
      </YellowButton>
    </div>
  );
}