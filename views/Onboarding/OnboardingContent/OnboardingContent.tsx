import './OnboardingContent.scss';
import React, { FC } from 'react';
import EntainLogo from 'src/assets/logos/lg_entain.png';
import ContainedButton from '../../../components/molecules/ContainedButton/ContainedButton';
import { Note } from '../Onboarding.types';
import OnboardingNavbar from '../OnboardingNavbar/OnboardingNavbar';

interface IOnboardingContent {
  title: string;
  description?: string;
  notes: Note[];
  btnText: string;
  page: number;
  onNextClick: () => void;
}

const OnboardingContent: FC<IOnboardingContent> = ({
  title,
  description,
  notes,
  btnText,
  onNextClick,
  page,
}) => {
  return (
    <div>
      <OnboardingNavbar pageNumber={(page + 1).toString()} />

      <div className="Onboard">
        <div className="Onboard__Content">
          <div className="Onboard__Content__Top">
            <div className="Onboard__Content__Top__Main">
              <img src={EntainLogo} alt="logo" className="logo" />
              <div className="Onboard__Content__Top__Main__Title">{title}</div>
              {description && (
                <div className="Onboard__Content__Top__Main__Description">
                  {description}
                </div>
              )}
              <div className="Onboard__Content__Top__Main__NotesList">
                {notes.map(note => (
                  <div className={`OnboardNote`} key={note.text}>
                    <div className="OnboardNote__Icon">
                      <img src={note.iconSrc} className="icon" alt="icon" />
                    </div>
                    <div className="OnboardNote__Text">{note.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="Onboard__Content__Bottom">
            <ContainedButton
              className="Onboard__Content__Bottom__Button"
              onClick={onNextClick}
            >
              {btnText}
            </ContainedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingContent;
