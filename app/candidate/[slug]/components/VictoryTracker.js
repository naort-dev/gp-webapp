import GoalsChart from '@shared/candidates/GoalsChart';
import FaqLink from '@shared/content/FaqLink';

import { kFormatter, numberFormatter } from '/helpers/numberHelper';

// import GoalsChart from 'components/candidate-portal/CandidatePortalHomeWrapper/GoalsChart';

function VictoryTracker({ candidate, followers, color, editMode }) {
  const { likelyVoters, votesNeeded, overrideFollowers } = candidate;
  let voters = likelyVoters;
  if (!overrideFollowers && followers?.thisWeek > likelyVoters) {
    voters = followers.thisWeek;
  }

  return (
    <div className="rounded-2xl bg-white p-6 pb-5 relative z-10">
      <div className="flex items-center justify-between mb-12">
        <div data-cy="campaign-progrsss-title">
          <strong>Victory Meter</strong>
        </div>
        {!editMode ? (
          <FaqLink articleId="4KOzae6PB45c9GQY9Xi9UX">
            <span className="no-underline" data-cy="campaign-progress-ref">
              <div className="text-sm text-neutral-400">What`s this?</div>
            </span>
          </FaqLink>
        ) : null}
      </div>
      <GoalsChart candidate={candidate} color={color} />
      <div className="flex justify-center mb-6">
        <div className="text-right" data-cy="campaign-likely-voters">
          🗳 {kFormatter(voters)}
          <div className="text-sm">Likely Voters</div>
        </div>
        <div className="w-20" />
        <div data-cy="campaign-needed-votes">
          {kFormatter(votesNeeded)} 🎉
          <div className="text-sm">needed to win</div>
        </div>
      </div>
    </div>
  );
}

export default VictoryTracker;