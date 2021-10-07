/* eslint-disable @typescript-eslint/indent */
import { FunctionComponent, SVGProps } from 'react';
import { SoftSkillType } from '../enums/successProfile.enum';
import { ReactComponent as SoftSkillDifferentiatorIcon } from '../icons/Hot.svg';
import { ReactComponent as SoftSkillCoreIcon } from '../icons/Puzzle.svg';
import { ReactComponent as AdeptsToChangeIcon } from '../icons/softSkills/AdaptsToChange.svg';
import { ReactComponent as AgilityAndAdaptabilityIcon } from '../icons/softSkills/AgilityAndAdaptability.svg';
import { ReactComponent as AnalysesInformationIcon } from '../icons/softSkills/AnalysesInformation.svg';
import { ReactComponent as AnalyticalProblemSolvingIcon } from '../icons/softSkills/AnalyticalProblemSolving.svg';
import { ReactComponent as BuildsNetworksIcon } from '../icons/softSkills/BuildsNetworks.svg';
import { ReactComponent as ChangeAgilityIcon } from '../icons/softSkills/ChangeAgility.svg';
import { ReactComponent as CollaboratesWithOthersIcon } from '../icons/softSkills/CollaboratesWithOthers.svg';
import { ReactComponent as CreatesIdeasIcon } from '../icons/softSkills/CreatesIdeas.svg';
import { ReactComponent as DevelopsExpertiseIcon } from '../icons/softSkills/DevelopsExpertise.svg';
import { ReactComponent as DevelopsStrategiesIcon } from '../icons/softSkills/DevelopsStrategies.svg';
import { ReactComponent as DisplaysCompassionIcon } from '../icons/softSkills/DisplaysCompassion.svg';
import { ReactComponent as InclusivityAndCollaborationIcon } from '../icons/softSkills/InclusivityAndCollaboration.svg';
import { ReactComponent as InductiveIcon } from '../icons/softSkills/Inductive.svg';
import { ReactComponent as InfluencesOthersIcon } from '../icons/softSkills/InfluencesOthers.svg';
import { ReactComponent as LeadsPeopleIcon } from '../icons/softSkills/LeadsPeople.svg';
import { ReactComponent as LearningAgilityIcon } from '../icons/softSkills/LearningAgility.svg';
import { ReactComponent as MakesThingsHappenIcon } from '../icons/softSkills/MakesThingsHappen.svg';
import { ReactComponent as NumericalIcon } from '../icons/softSkills/Numerical.svg';
import { ReactComponent as OptimismAndDeterminationIcon } from '../icons/softSkills/OptimismAndDetermination.svg';
import { ReactComponent as PeopleAgilityIcon } from '../icons/softSkills/PeopleAgility.svg';
import { ReactComponent as ProducesGreatWorkIcon } from '../icons/softSkills/ProducesGreatWork.svg';
import { ReactComponent as SeeksProgressionIcon } from '../icons/softSkills/SeeksProgression.svg';
import { ReactComponent as ShowsPositivityIcon } from '../icons/softSkills/ShowsPositivity.svg';
import { ReactComponent as ShowsResilienceIcon } from '../icons/softSkills/ShowsResilience.svg';
import { ReactComponent as SolvesProblemsIcon } from '../icons/softSkills/SolvesProblems.svg';
import { ReactComponent as SupportsPeopleIcon } from '../icons/softSkills/SupportsPeople.svg';
import { ReactComponent as ThinksCommerciallyIcon } from '../icons/softSkills/ThinksCommercially.svg';
import { ReactComponent as UpholdsEthicsAndValuesIcon } from '../icons/softSkills/UpholdsEthicsAndValues.svg';
import { ReactComponent as VerbalIcon } from '../icons/softSkills/Verbal.svg';
import { ReactComponent as WeAreCuriousAndInnovativeIcon } from '../icons/softSkills/WeAreCuriousAndInnovative.svg';
import { ReactComponent as WeArePassionateIcon } from '../icons/softSkills/WeArePassionate.svg';
import { ReactComponent as WeAreSupportiveAndCaringIcon } from '../icons/softSkills/WeAreSupportiveAndCaring.svg';
import { ReactComponent as WeHaveFunIcon } from '../icons/softSkills/WeHaveFun.svg';
import { ReactComponent as WeWinTogetherIcon } from '../icons/softSkills/WeWinTogether.svg';
import { ReactComponent as SoftSkillDiversityIcon } from '../icons/Star.svg';

export const SoftSkillIcons: {
  [key in number]: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string }
  >;
} = {
  1: AdeptsToChangeIcon,
  2: AnalysesInformationIcon,
  3: BuildsNetworksIcon,
  4: CreatesIdeasIcon,
  5: DevelopsExpertiseIcon,
  6: DevelopsStrategiesIcon,
  7: InfluencesOthersIcon,
  8: LeadsPeopleIcon,
  9: MakesThingsHappenIcon,
  10: ProducesGreatWorkIcon,
  11: SeeksProgressionIcon,
  12: SolvesProblemsIcon,
  13: SupportsPeopleIcon,
  14: ThinksCommerciallyIcon,
  15: UpholdsEthicsAndValuesIcon,
  16: InductiveIcon,
  17: VerbalIcon,
  18: NumericalIcon,
  19: ShowsResilienceIcon,
  20: CollaboratesWithOthersIcon,
  21: ShowsPositivityIcon,
  22: DisplaysCompassionIcon,
  23: AnalyticalProblemSolvingIcon,
  24: ChangeAgilityIcon,
  25: LearningAgilityIcon,
  26: PeopleAgilityIcon,
  27: OptimismAndDeterminationIcon,
  28: InclusivityAndCollaborationIcon,
  29: AgilityAndAdaptabilityIcon,
  30: WeArePassionateIcon,
  31: WeWinTogetherIcon,
  32: WeAreSupportiveAndCaringIcon,
  33: WeAreCuriousAndInnovativeIcon,
  34: WeHaveFunIcon,
  54: ProducesGreatWorkIcon,
  55: UpholdsEthicsAndValuesIcon,
  56: ShowsPositivityIcon,
  57: ThinksCommerciallyIcon,
  58: LeadsPeopleIcon,
  59: CollaboratesWithOthersIcon,
  60: BuildsNetworksIcon,
};

const SSDefaultIcon = AdeptsToChangeIcon;

export const getSoftSkillIcon = (softSkillId?: number) => {
  return softSkillId && SoftSkillIcons[softSkillId]
    ? SoftSkillIcons[softSkillId]
    : SSDefaultIcon;
};

export const SuccessProfileSoftSkillTypeIcons: {
  [key in SoftSkillType]: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string }
  >;
} = {
  [SoftSkillType.CORE]: SoftSkillCoreIcon,
  [SoftSkillType.DIFFERENTIATOR]: SoftSkillDifferentiatorIcon,
  [SoftSkillType.DIVERSITY]: SoftSkillDiversityIcon,
};

export const getSuccessProfileSoftSkillTypeIcon = (
  successProfileType?: SoftSkillType
) => {
  if (!successProfileType) {
    return SoftSkillCoreIcon;
  }

  return (
    SuccessProfileSoftSkillTypeIcons[successProfileType] || SoftSkillCoreIcon
  );
};
