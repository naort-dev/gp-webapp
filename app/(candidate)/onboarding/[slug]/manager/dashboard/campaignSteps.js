import { FaRegLightbulb } from 'react-icons/fa';
import { SlRocket } from 'react-icons/sl';
import { MdHowToVote } from 'react-icons/md';
import { detailFieldsCount } from '../../details/[step]/detailsFields';

const campaignSteps = [
  {
    key: 'preLaunch',
    title: '1. Pre Launch',
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut neque orci.',
    icon: <FaRegLightbulb size={30} />,
    steps: [
      {
        key: 'details',
        label: 'Candidate Details',
        subTitle:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut neque orci.',
        steps: detailFieldsCount,
      },
      {
        key: 'goals',
        label: 'Goals & Objectives',
        subTitle:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut neque orci.',
        steps: 7,
      },
    ],
  },
  {
    key: 'launch',
    title: '2. Launch',
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut neque orci.',
    icon: <SlRocket size={30} />,
    steps: [
      {
        key: 'details',
        label: 'Candidate Details',
        subTitle:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut neque orci.',
        steps: detailFieldsCount,
      },
    ],
  },
  {
    key: 'run',
    title: '3. Run',
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut neque orci.',
    icon: <MdHowToVote size={30} />,
    steps: [
      {
        key: 'details',
        label: 'Candidate Details',
        subTitle:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut neque orci.',
        steps: detailFieldsCount,
      },
    ],
  },
];

export default campaignSteps;

export const generateCampaignStatus = (campaign) => {
  const status = {
    preLaunch: { status: 'Not Started', completedSteps: 0 },
    launch: { status: 'Not Started', completedSteps: 0 },
    run: { status: 'Not Started', completedSteps: 0 },
    nextStep: {
      sectionIndex: 0,
      step: 0,
    },
  };
  if (!campaign) {
    return status;
  }
  const { details } = campaign;
  console.log(
    'Object.keys(details).length === detailFieldsCount',
    Object.keys(details).length,
    detailFieldsCount,
  );
  if (details) {
    status.preLaunch.status = 'In Progress';
    status.preLaunch.details = {};
    status.preLaunch.details.status = 'In Progress';
    const completedSteps = Object.keys(details).length;
    status.preLaunch.details.completedSteps = completedSteps;
    if (completedSteps === detailFieldsCount && details.pledged) {
      status.preLaunch.details.status = 'Completed';
      status.preLaunch.completedSteps++;
      status.nextStep.step++;
    }
  }

  return status;
};
