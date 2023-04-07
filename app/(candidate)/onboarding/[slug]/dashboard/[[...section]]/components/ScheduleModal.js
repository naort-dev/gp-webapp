'use client';
import { updateCampaign } from 'app/(candidate)/onboarding/shared/ajaxActions';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Modal = dynamic(() => import('@shared/utils/Modal'));

export default function ScheduleModal({ campaign }) {
  const [showModal, setShowModal] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowContinue(true);
  };

  const handleContinue = async () => {
    await updateCampaign({
      ...campaign,
      incentive: {
        completed: true,
      },
    });
    window.location.href = `/onboarding/${campaign.slug}/dashboard`;
  };

  return (
    <>
      {showContinue ? (
        <>
          <div
            className="bg-yellow-400  py-4 px-12 inline-block rounded-full cursor-pointer transition-colors hover:bg-yellow-200"
            onClick={handleContinue}
          >
            <div className="font-black">CONTINUE</div>
          </div>
          <div
            className="mt-2 text-blue-400 text-sm cursor-pointer"
            onClick={() => {
              setShowContinue(false);
            }}
          >
            Schedule another meeting
          </div>
        </>
      ) : (
        <div
          className="bg-yellow-400  py-4 px-12 inline-block rounded-full cursor-pointer transition-colors hover:bg-yellow-200"
          onClick={handleOpenModal}
        >
          <div className="font-black">SCHEDULE</div>
        </div>
      )}
      {showModal && (
        <Modal closeCallback={handleCloseModal} open>
          <div className="w-[80vw] max-w-[900px] h-[90vh]">
            <iframe
              src="https://meetings.hubspot.com/jared-alper"
              width="100%"
              height="100%"
            />
          </div>
        </Modal>
      )}
    </>
  );
}