import BrainIcon from '../../icons/ic_brain.svg';
import CupIcon from '../../icons/ic_cup.svg';
import ExternalIcon from '../../icons/ic_external.svg';
import HatIcon from '../../icons/ic_hat.svg';
import IdeaIcon from '../../icons/ic_idea.svg';
import MessageIcon from '../../icons/ic_msg.svg';
import NoteIcon from '../../icons/ic_note.svg';
import PerformanceIcon from '../../icons/ic_performance.svg';
import PotentialIcon from '../../icons/ic_potential.svg';
import SettingsIcon from '../../icons/ic_settings.svg';
import ValuesIcon from '../../icons/ic_values.svg';

export const firstPageContent = {
  title: 'Talent Review Introduction',
  description:
    'Welcome to the 2022 Entain Talent review process. This year we have launched a systematic approach to the way in which we    evaluate our leaders at SLT, SLT-1 and SLT-2. We will be ratingall leaders in relation to 3 domains',
  notes: [
    { iconSrc: ValuesIcon, text: 'Their alignment with our Values' },
    { iconSrc: PerformanceIcon, text: 'Their level of performance' },
    {
      iconSrc: PotentialIcon,
      text: 'Their potential to operate at the next level within 12 months',
    },
  ],
  btnText: 'Next',
};

export const secondPageContent = {
  title: 'Why are we doing this?',
  notes: [
    {
      iconSrc: BrainIcon,
      text: 'To get a clear understanding of the overall capability of this leadership population',
    },
    {
      iconSrc: HatIcon,
      text: 'To get an objective view of the areas that we need to focus on to improve leader performance',
    },
    {
      iconSrc: IdeaIcon,
      text: 'To get a talent map to indicate possible successors to key roles',
    },
  ],
  btnText: 'Next',
};

export const thirdPageContent = {
  title: 'What is next steps?',
  notes: [
    {
      iconSrc: CupIcon,
      text: 'This assessment will ask you to rate your direct report in relation to several behavioural statements.',
    },
    {
      iconSrc: ExternalIcon,
      text: 'You will also be asked to provide free text comments to support your perspective, and to indicate any role that you believe this individual could be a successor for in the future.',
    },
    {
      iconSrc: SettingsIcon,
      text: 'Please think carefully about your ratings. We will be reviewing and calibrating each individual, with a view to identifying the top 10% of this population as true high potentials. So award the highest ratings with care and consideration.',
    },
    {
      iconSrc: NoteIcon,
      text: 'Once you have completed the assessment, a report will generate for this individual. It will display your overall talent rating for the individual, as well as scores on the Values, Performance and Potential domains.',
    },
    {
      iconSrc: MessageIcon,
      text: ' You will be emailed this report and be able to access it via the SZ portal. If you have more than one direct report, you will also be provided with an aggregate report with data for your team at the end of this process.',
    },
  ],
  btnText: 'Next',
};
