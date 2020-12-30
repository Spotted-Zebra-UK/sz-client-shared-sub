import './SoftSkill.scss';
import React, { FC } from 'react';
import { ITrait } from '../Trait/Trait';

export interface ISoftSkill {
  id?: number;
  name: string;
  grade?: string;
  score?: number;
  color?: string;
  orientation?: string;
  text?: string;
  traits?: ITrait[];
}

const SoftSkill: FC<ISoftSkill> = props => {
  const { name } = props;

  return (
    <div className="SoftSkill">
      <img
        src={`${process.env.PUBLIC_URL}/SoftSkill/${name}.svg`}
        alt={`${name}.svg`}
        className="SoftSkill__Icon"
      />
      <h4 className="SoftSkill__Name">{name}</h4>
    </div>
  );
};

export default SoftSkill;
