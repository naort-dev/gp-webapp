import CandidateAvatar from '@shared/candidates/CandidateAvatar';
import { partyResolver } from 'helpers/candidateHelper';
import GetInvolvedButton from './GetInvolvedButton';
import dynamic from 'next/dynamic';

const ColorPicker = dynamic(() => import('./ColorPicker'));
const ImageUploader = dynamic(() => import('./ImageUploader'));

export default function Hero(props) {
  const { candidate, color, textColor, editMode, campaign } = props;

  const { firstName, lastName, party, office, state } = candidate;

  return (
    <div
      className=" text-white rounded-2xl px-7 py-8"
      style={{ backgroundColor: color, color: textColor }}
    >
      <div className="flex">
        <div className="relative">
          <CandidateAvatar candidate={candidate} />
          {editMode ? <ImageUploader campaign={campaign} /> : null}
        </div>
        <div className="flex-1 pl-6 lg:pl-12 flex flex-col justify-between">
          <div className="hidden lg:block text-right">
            {editMode ? (
              <ColorPicker {...props} />
            ) : (
              <GetInvolvedButton {...props} />
            )}
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-black">
              {firstName} <div className="lg:hidden"></div>
              {lastName}
            </div>
            <div className="mt-3">
              {partyResolver(party)}
              <div className="lg:hidden"></div>
              <div className="hidden lg:inline-block px-3">&middot;</div>
              {office}
              <div className="lg:hidden"></div>
              <div className="hidden lg:inline-block px-3">&middot;</div>
              {state}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden  text-center mt-10">
        <GetInvolvedButton {...props} />
      </div>
    </div>
  );
}