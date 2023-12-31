// import { fetchUserCampaign } from 'app/(candidate)/onboarding/shared/getCampaign';
import { fetchContentByKey } from 'helpers/fetchHelper';
import pageMetaData from 'helpers/metadataHelper';
import { camelToSentence } from 'helpers/stringHelper';
import candidateAccess from '../shared/candidateAccess';
import ContentPage from './components/ContentPage';
import { fetchUserCampaign } from 'app/(candidate)/onboarding/shared/getCampaign';

const meta = pageMetaData({
  title: 'Campaign Content | GOOD PARTY',
  description: 'Campaign Content',
  slug: '/dashboard/content',
});
export const metadata = meta;

export default async function Page({ params, searchParams }) {
  await candidateAccess();
  const { campaign } = await fetchUserCampaign();

  const promptsRaw = (await fetchContentByKey('candidateContentPrompts', 360))
    .content;
  const prompts = parsePrompts(promptsRaw);

  const templates = (await fetchContentByKey('candidateContentPrompts', 360))
    .content;

  const categories = (await fetchContentByKey('aiContentCategories', 360))
    .content;

  const childProps = {
    pathname: '/dashboard/content',
    // campaign,
    prompts,
    templates,
    categories,
    pathToVictory: campaign?.pathToVictory,
  };

  return <ContentPage {...childProps} />;
}

function parsePrompts(promptsRaw) {
  const keys = Object.keys(promptsRaw);
  const prompts = [];
  keys.forEach((key) => {
    prompts.push({
      key,
      title: camelToSentence(key),
    });
  });
  return prompts;
}
