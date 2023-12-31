export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';

import { fetchPositions } from 'app/(candidate)/onboarding/[slug]/details/[step]/page';
import pageMetaData from 'helpers/metadataHelper';
import { adminAccessOnly } from 'helpers/permissionHelper';
import gpApi from 'gpApi';
import gpFetch from 'gpApi/gpFetch';

import { getServerToken } from 'helpers/userServerHelper';
import ReviewCandidatePage from '../components/ReviewCandidatePage';
import { mapTopIssues } from '../edit/mapTopIssues';
import mapCampaignToCandidate from '../edit/mapCampaignToCandidate';
import UserSnapScript from '@shared/scripts/UserSnapScript';
import FullStoryScript from '@shared/scripts/FullStoryScript';

export async function generateMetadata({ params }) {
  const { slug } = params;

  const meta = pageMetaData({
    title: 'Admin campaign review',
    description: 'Admin campaign review',
    slug: `/candidate/${slug}/review`,
  });
  return meta;
}

export async function fetchCampaign(slug) {
  try {
    const api = gpApi.campaign.onboarding.findBySlug;
    const token = getServerToken();
    const payload = {
      slug,
    };
    return await gpFetch(api, payload, 1, token);
  } catch (e) {
    console.log('error', e);
    return false;
  }
}

export default async function Page({ params }) {
  adminAccessOnly();
  const { slug } = params;
  const { campaign } = await fetchCampaign(slug);
  const candidate = mapCampaignToCandidate(campaign);

  if (!candidate) {
    notFound();
  }

  const { positions } = await fetchPositions();

  const childProps = {
    campaign,
    candidate,
    reviewMode: true,
    editMode: true,
    candidatePositions: mapTopIssues(campaign.details?.topIssues),
    positions, // for issuesSelector
  };

  return (
    <>
      <ReviewCandidatePage {...childProps} />
      <UserSnapScript />
      <FullStoryScript />
    </>
  );
}
