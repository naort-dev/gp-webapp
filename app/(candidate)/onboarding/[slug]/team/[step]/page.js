export const dynamic = 'force-dynamic';

import getCampaign from 'app/(candidate)/onboarding/shared/getCampaign';
import OnboardingStepPage from '../../../shared/OnboardingStepPage';
import campaignSteps from '../../dashboard/[[...section]]/campaignSteps';
import teamFields from './teamFields';

export default async function Page({ params }) {
  const { slug, step } = params;
  const campaign = await getCampaign(params);

  let stepInt = step ? parseInt(step, 10) : 1;

  const stepFields = teamFields[stepInt - 1];

  const section = { label: 'Pre Launch', index: 1 };
  const subSectionKey = campaignSteps[0].steps[3].key;
  const subSectionLabel = campaignSteps[0].steps[3].title;

  let nextPath = `/${subSectionKey}/${stepInt + 1}`;
  if (stepFields.finalStep) {
    nextPath = `/dashboard`;
  }

  const childProps = {
    title: stepFields.title,
    subTitle: stepFields.subTitle,
    slug,
    campaign,
    inputFields: stepFields.fields,
    step: stepInt,
    pathname: `/${subSectionKey}/${stepInt}`,
    nextPath,
    subSectionKey,
    section,
    subSectionLabel,
  };
  return <OnboardingStepPage {...childProps} />;
}
