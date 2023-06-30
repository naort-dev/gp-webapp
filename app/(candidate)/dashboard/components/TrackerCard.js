import SecondaryButton from '@shared/buttons/SecondaryButton';
import Body2 from '@shared/typography/Body2';
import H3 from '@shared/typography/H3';
import H4 from '@shared/typography/H4';
import ProgressPie from './ProgressPie';
import { useState } from 'react';
import Modal from '@shared/utils/Modal';
import H2 from '@shared/typography/H2';
import Body1 from '@shared/typography/Body1';
import TextField from '@shared/inputs/TextField';
import PrimaryButton from '@shared/buttons/PrimaryButton';

export default function TrackerCard(props) {
  const [showModal, setShowModal] = useState(false);

  const { card, updateCountCallback, reportedVoterGoals } = props;
  const { key, title, subTitle, progress, total, icon } = card;

  const [value, setValue] = useState(0);

  const onChangeField = (val) => {
    setValue(val);
  };

  const handleSubmit = () => {
    const newTotal = reportedVoterGoals[key] + parseInt(value, 10);
    updateCountCallback(key, newTotal);
    setShowModal(false);
    setValue(0);
  };
  return (
    <div className="bg-gray-50 py-6 px-7 border border-slate-300 rounded-2xl">
      <div className="flex items-center mb-5">
        <div className="text-indigo-50 mr-2">{icon}</div>
        <H4>{title}</H4>
      </div>
      <ProgressPie total={total} progress={progress} />
      <div
        className="mt-7"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <SecondaryButton fullWidth size="medium">
          Add
        </SecondaryButton>
      </div>
      {showModal ? (
        <Modal closeCallback={() => setShowModal(false)} open>
          <div className="lg:min-w-[740px]">
            <H2 className="pb-5 mb-5 border-b border-slate-500 text-center">
              Update {title}
            </H2>
            <Body1 className="mb-5">
              Update the total {subTitle} this week
            </Body1>
            <TextField
              label={title}
              onChange={(e) => onChangeField(e.target.value)}
              value={value}
              fullWidth
              type="number"
            />
            <div className="flex justify-center items-center mt-3">
              <div
                className="mr-6 cursor-pointer hover:underline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </div>
              <div onClick={handleSubmit}>
                <PrimaryButton>
                  Update total {title.toLowerCase()}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}