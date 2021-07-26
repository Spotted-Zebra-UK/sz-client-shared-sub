import { Tests } from '../enums/test.enum';
import { ReactComponent as CognitiveCombinedIcon } from '../icons/tests/Cognitive.svg';
import { ReactComponent as InductiveIcon } from '../icons/tests/Inductive.svg';
import { ReactComponent as MotivationIcon } from '../icons/tests/Motivation.svg';
import { ReactComponent as NumericalIcon } from '../icons/tests/Numerical.svg';
import { ReactComponent as PersonalityIcon } from '../icons/tests/Personality.svg';
import { ReactComponent as VerbalIcon } from '../icons/tests/Verbal.svg';

const testIcons = {
  [Tests.COGNITIVE_COMBINED]: CognitiveCombinedIcon,
  [Tests.INDUCTIVE]: InductiveIcon,
  [Tests.MOTIVATION]: MotivationIcon,
  [Tests.NUMERICAL]: NumericalIcon,
  [Tests.PERSONALITY]: PersonalityIcon,
  [Tests.VERBAL]: VerbalIcon,
};

export default testIcons;
