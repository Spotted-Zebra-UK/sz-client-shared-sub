import './Trait.scss';
import React, { FC } from 'react';
import { colorResolver } from '../../../helpers/colorResolver';

export interface ITrait {
  id?: number;
  color: string;
  icon: string;
  bullet: string;
}

const Trait: FC<ITrait> = props => {
  const { color, icon, bullet } = props;
  const backgroundColor = {backgroundColor: colorResolver(color, 0.2)};

  return (
    <div className="Trait">
      <div className="Trait__Status" style={backgroundColor}>
        <img src={icon} alt="status.svg" className="AbsolutelyCentered" />
      </div>

      <h6 className="Trait__Bullet">{bullet}</h6>
    </div>
  );
};

export default Trait;
