'use client';
import BlackButtonClient from '@shared/buttons/BlackButtonClient';
import { useEffect, useState } from 'react';
import { updateCampaign } from 'app/(candidate)/onboarding/shared/ajaxActions';
import PositionsSelector from 'app/(candidate)/onboarding/shared/PositionsAutocomplete';
import TextField from '@shared/inputs/TextField';
import { savingState } from 'app/(candidate)/onboarding/shared/OnboardingPage';
import Body1 from '@shared/typography/Body1';
import { IoMdClose } from 'react-icons/io';
import PrimaryButton from '@shared/buttons/PrimaryButton';

export default function CandidateIssueSelector({
  positions,
  onSaveCallback,
  candidate,
  candidatePositions,
  initialPosition,
}) {
  const positionsWithOther = [
    ...positions,
    {
      id: 'custom-id',
      name: '+ Add custom position',
      topIssue: { name: 'Other' },
    },
  ];
  const [state, setState] = useState({ position: initialPosition, text: '' });

  const onChangeField = (key, value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const onChangePositions = (position) => {
    console.log('po', position);
    onChangeField('position', position);
  };

  const handleSave = () => {
    onSaveCallback(state.position, state.text);
  };

  // const addCustom = () => {
  //   const updated = [
  //     ...state.positions,
  //     {
  //       id: 'custom-id',
  //       name: 'Custom Issue',
  //       topIssue: { name: 'Other' },
  //     },
  //   ];

  //   onChangeField('positions', updated);
  // };

  return (
    <>
      <div>
        <div>
          {state.position ? (
            <div className="rounded-full bg-primary py-2 px-3 text-slate-50 items-center inline-flex">
              <Body1>{state.position.name}</Body1>
              <IoMdClose
                className="ml-2 cursor-pointer"
                onClick={() => {
                  onChangeField('position', false);
                }}
              />
            </div>
          ) : (
            <div>
              <PositionsSelector
                positions={positionsWithOther}
                updateCallback={onChangePositions}
                // initialSelected={state.positions}
                square
              />
            </div>
          )}
        </div>
        {state.position ? (
          <div className="mt-6">
            <TextField
              placeholder="Write 1 or 2 sentences about your position on this issue"
              multiline
              rows={6}
              inputProps={{ maxLength: 1000 }}
              fullWidth
              value={state.text}
              onChange={(e) => {
                onChangeField('text', e.target.value);
              }}
            />
            <div className="text-right mt-4">
              <div className="inline-block" onClick={handleSave}>
                <PrimaryButton disabled={state.text === ''}>Save</PrimaryButton>
              </div>
            </div>
          </div>
        ) : null}
        {/* <div
          className="my-5 font-bold text-blue-500 cursor-pointer"
          onClick={addCustom}
        >
          Add your custom Issue
        </div> */}
        {/* {state.positions?.map((position) => (
          <>
            {position && (
              <div className="mt-6 mb-10" key={position?.name}>
                Tell us your stance on {position?.name} (
                {position?.topIssue?.name})
                <div>
                  <TextField
                    placeholder="Write here..."
                    multiline
                    rows={6}
                    fullWidth
                    value={state[`position-${position?.id}`]}
                    error={state[`position-${position?.id}`] === ''}
                    onChange={(e) => {
                      onChangeField(`position-${position?.id}`, e.target.value);
                    }}
                  />
                </div>
              </div>
            )}
          </>
        ))} */}
      </div>
    </>
  );
}