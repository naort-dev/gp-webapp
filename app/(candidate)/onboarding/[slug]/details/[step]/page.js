export const dynamic = 'force-dynamic';

import getCampaign from 'app/(candidate)/onboarding/shared/getCampaign';
import { fetchArticle } from 'app/blog/article/[slug]/page';
import gpApi from 'gpApi';
import gpFetch from 'gpApi/gpFetch';
import { fetchContentByKey } from 'helpers/fetchHelper';
import { getServerToken, getServerUser } from 'helpers/userServerHelper';
import OnboardingStepPage from '../../../shared/OnboardingStepPage';
import campaignSteps from '../../dashboard/[[...section]]/campaignSteps';
import detailsFields from './detailsFields';

const fetchPositions = async () => {
  const api = gpApi.admin.position.list;
  const token = getServerToken();
  return await gpFetch(api, false, 3600, token);
};

export default async function Page({ params }) {
  const { slug, step } = params;
  const campaign = await getCampaign(params);

  let stepInt = step ? parseInt(step, 10) : 1;

  const stepFields = detailsFields[stepInt - 1];
  const { pageType } = stepFields;
  let positions = [];
  if (pageType === 'issuesPage') {
    ({ positions } = await fetchPositions());
  }
  if (stepInt === 1) {
    const user = getServerUser();
    const name = user.name.split(' ');
    stepFields.fields[0].initialValue = name[0];
    stepFields.fields[1].initialValue =
      name.length > 0 ? name[name.length - 1] : '';
  }

  if (stepInt === 2) {
    const user = getServerUser();
    stepFields.fields[0].initialValue = user.zip;
  }
  // const articles = [];
  // if (stepInt === 5) {
  //   if (stepFields.fields[4].articles) {
  //     const articlesSlugs = stepFields.fields[4].articles;
  //     for (let i = 0; i < articlesSlugs.length; i++) {
  //       const article = await fetchArticle(articlesSlugs[i]);
  //       articles.push(article?.content);
  //     }
  //   }
  // }

  let pledge;
  if (pageType === 'pledgePage') {
    const res = await fetchContentByKey('pledge');
    pledge = res.content;
  }
  const section = { label: 'Pre Launch', index: 1 };
  const subSectionKey = campaignSteps[0].steps[0].key;
  const subSectionLabel = campaignSteps[0].steps[0].title;

  const childProps = {
    title: stepFields.title,
    subTitle: stepFields.subTitle,
    skipable: stepFields.skipable,
    slug,
    campaign,
    inputFields: stepFields.fields,
    step: stepInt,
    pathname: `/${subSectionKey}/${stepInt}`,
    pageType,
    pledge,
    positions,
    nextPath: `/${subSectionKey}/${stepInt + 1}`,
    subSectionKey,
    totalSteps: detailsFields.length,
    section,
    subSectionLabel,
    // articles,
  };
  return <OnboardingStepPage {...childProps} />;
}